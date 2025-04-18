const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");

exports.onExecutePostLogin = async (event, api) => {
  console.log("Running action:", "activateNewUsersInCIS");

  const WHITELISTED_CONNECTIONS = [
    "email",
    "firefoxaccounts",
    "github",
    "google-oauth2",
    "Mozilla-LDAP",
    "Mozilla-LDAP-Dev",
  ];

  // We can only provision users that have certain connection strategies
  if (!WHITELISTED_CONNECTIONS.includes(event.connection.name)) {
    console.log(
      `${event.connection.name} is not whitelisted. Skip activateNewUsersInCIS`
    );
    return;
  }

  // If you're explicitly flagged as existing in CIS, then we don't need to continue onward
  if (event.user.app_metadata?.existsInCIS) {
    console.log(
      `${event.user.user_id} existsInCIS is True.  Skip activateNewUsersInCIS`
    );
    return;
  }

  // Consts
  const AUTH0_TIMEOUT = 5000; // milliseconds
  const CHANGEAPI_TIMEOUT = 14000; // milliseconds
  const PERSONAPI_BEARER_TOKEN_REFRESH_AGE = 64800; // 18 hours
  const PERSONAPI_TIMEOUT = 5000; // milliseconds
  const PUBLISHER_NAME = "access_provider";
  const USER_ID = event.user.user_id;

  // If we don't have the secret variables we need, bail
  // note that this requires the "PersonAPI - Auth0" application configured with the following scopes:
  // classification: public, display: none, display: public, write
  if (
    !event.secrets.accessKeyId ||
    !event.secrets.secretAccessKey ||
    !event.secrets.changeapi_url ||
    !event.secrets.personapi_oauth_url ||
    !event.secrets.personapi_client_id ||
    !event.secrets.personapi_client_secret ||
    !event.secrets.personapi_url ||
    !event.secrets.personapi_audience
  ) {
    console.log("Error: Unable to find secrets");
    return;
  }

  // Retrieve and return a secret from AWS Secrets Manager
  const getSecrets = async (AWS, accessKeyId, secretAccessKey) => {
    try {
      if (!accessKeyId || !secretAccessKey) {
        throw new Error("AWS access keys are not defined.");
      }

      // set AWS config so we can retrieve secrets
      AWS.config.update({
        region: "us-west-2",
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      });

      const secretsManager = new AWS.SecretsManager();
      const secretPath =
        event.tenant.id === "dev"
          ? "/iam/auth0/dev/actions"
          : "/iam/auth0/prod/actions";
      const data = await secretsManager
        .getSecretValue({ SecretId: secretPath })
        .promise();
      // handle string or binary
      if ("SecretString" in data) {
        return JSON.parse(data.SecretString);
      } else {
        let buff = Buffer.from(data.SecretBinary, "base64");
        return buff.toString("ascii");
      }
    } catch (err) {
      console.log("getSecrets:", err);
      throw err;
    }
  };

  // Load secrets
  const accessKeyId = event.secrets.accessKeyId;
  const secretAccessKey = event.secrets.secretAccessKey;
  const secrets = await getSecrets(AWS, accessKeyId, secretAccessKey);
  const changeapi_auth0_private_key = secrets.changeapi_auth0_private_key;
  const changeapi_null_profile = secrets.changeapi_null_profile;

  // we also need to decode the private key from base64 into a PEM format that `jsonwebtoken` understands
  // generated with:
  // import base64
  // import boto3
  // base64.b64encode(boto3.client('ssm').get_parameter(Name='/iam/cis/development/keys/access_provider', WithDecryption=True)['Parameter']['Value'].encode('ascii')).decode('ascii')
  const privateKey = Buffer.from(
    changeapi_auth0_private_key,
    "base64"
  ).toString("ascii");

  const getBearerToken = async () => {
    console.log("Retrieving bearer token to create new user in CIS");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(AUTH0_TIMEOUT),
      body: JSON.stringify({
        audience: event.secrets.personapi_audience,
        client_id: event.secrets.personapi_client_id,
        client_secret: event.secrets.personapi_client_secret,
        grant_type: "client_credentials",
      }),
    };

    try {
      const response = await fetch(event.secrets.personapi_oauth_url, options);
      if (!response.ok) {
        // Throw an error if the response status code is not in the 200-299 range
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Cache bearer token, so it's not constantly retrieved
      // TODO: actually cache the bearer token
      const personapi_bearer_token = data.access_token;
      console.log(`Successfully retrieved bearer token from Auth0`);
      return personapi_bearer_token;
    } catch (err) {
      throw Error(`Unable to retrieve bearer token from Auth0: ${err}`);
    }
  };

  const createPersonProfile = () => {
    console.log(`Generating CIS profile for ${USER_ID}`);

    const date = new Date();
    const now = date.toISOString();

    // load the user skeleton, as generated by:
    // base64.b64encode(json.dumps(requests.get('https://raw.githubusercontent.com/mozilla-iam/cis/master/python-modules/cis_profile/cis_profile/data/user_profile_null.json').json(), separators=(',', ':')).encode('ascii'))
    const profile = JSON.parse(
      Buffer.from(changeapi_null_profile, "base64").toString("ascii")
    );

    // update attributes in the skeleton
    // normally we shouldn't need to change anything but the values, but this is manually doing it because
    // I have no idea if the skeleton will ever change underneath me
    profile.active.metadata.last_modified = now;
    profile.active.signature.publisher.name = PUBLISHER_NAME;
    profile.active.value = true;

    // order goes given_name -> name -> family_name -> nickname -> ' '
    profile.first_name.metadata.display = "private";
    profile.first_name.metadata.last_modified = now;
    profile.first_name.signature.publisher.name = PUBLISHER_NAME;
    profile.first_name.value =
      event.user.given_name ||
      event.user.name ||
      event.user.family_name ||
      event.user.nickname ||
      " ";

    profile.last_name.metadata.display = "private";
    profile.last_name.metadata.last_modified = now;
    profile.last_name.signature.publisher.name = PUBLISHER_NAME;
    profile.last_name.value = event.user.family_name
      ? event.user.family_name
      : " ";

    profile.primary_email.metadata.last_modified = now;
    profile.primary_email.signature.publisher.name = PUBLISHER_NAME;
    profile.primary_email.value = event.user.email;

    profile.user_id.metadata.last_modified = now;
    profile.user_id.signature.publisher.name = PUBLISHER_NAME;
    profile.user_id.value = USER_ID;

    // now we need to go and update the identities values; this is based on the logic here:
    // https://github.com/mozilla-iam/cis/blob/master/python-modules/cis_publisher/cis_publisher/auth0.py
    // which may or may not be correct, I dunno
    for (let i = 0; i < event.user.identities.length; i++) {
      const identity = event.user.identities[i];
      // ignore a provider if it's not whitelisted
      if (!WHITELISTED_CONNECTIONS.includes(identity.connection)) {
        continue;
      }

      // store the login_method for the first identity
      if (i === 0) {
        profile.login_method.metadata.last_modified = now;
        profile.login_method.signature.publisher.name = PUBLISHER_NAME;
        profile.login_method.value = identity.connection;
        if (
          identity.provider === "ad" &&
          (identity.connection === "Mozilla-LDAP" ||
            identity.connection === "Mozilla-LDAP-Dev")
        ) {
          profile.first_name.metadata.display = "staff";
          profile.last_name.metadata.display = "staff";
          profile.primary_email.metadata.display = "staff";
          // Note : This user will not show up as a staff member in people.mozilla.org
          // until the LDAP publisher runs and updates their CiS profile (which is being
          // created here) to have the "hris" data structure. That is what let's
          // people.mozilla.org know that the user is a staff member.
        }
      }

      if (identity.provider === "github") {
        profile.identities.github_id_v3.metadata.display = "private";
        profile.identities.github_id_v3.metadata.last_modified = now;
        profile.identities.github_id_v3.signature.publisher.name =
          PUBLISHER_NAME;
        profile.identities.github_id_v3.value = identity.user_id;

        if (event.user.nickname) {
          profile.usernames.metadata.display = "private";
          profile.usernames.signature.publisher.name = PUBLISHER_NAME;
          profile.usernames.values = {
            "HACK#GITHUB": event.user.nickname,
          };
        }

        if (identity.profileData) {
          // I could never seem to find a user that met this condition
          profile.identities.github_id_v4.metadata.display = "private";
          profile.identities.github_id_v4.metadata.last_modified = now;
          profile.identities.github_id_v4.signature.publisher.name =
            PUBLISHER_NAME;
          profile.identities.github_id_v4.value = identity.profileData.node_id;

          profile.identities.github_primary_email.metadata.display = "private";
          profile.identities.github_primary_email.metadata.last_modified = now;
          profile.identities.github_primary_email.metadata.verified =
            identity.profileData.email_verified === true;
          profile.identities.github_primary_email.signature.publisher.name =
            PUBLISHER_NAME;
          profile.identities.github_primary_email.value =
            identity.profileData.email;
        }
      } else if (identity.provider === "google-oauth2") {
        profile.identities.google_oauth2_id.metadata.display = "private";
        profile.identities.google_oauth2_id.metadata.last_modified = now;
        profile.identities.google_oauth2_id.signature.publisher.name =
          PUBLISHER_NAME;
        profile.identities.google_oauth2_id.value = identity.user_id;

        profile.identities.google_primary_email.metadata.display = "private";
        profile.identities.google_primary_email.metadata.last_modified = now;
        profile.identities.google_primary_email.signature.publisher.name =
          PUBLISHER_NAME;
        profile.identities.google_primary_email.value = event.user.email;
      } else if (
        identity.connection === "firefoxaccounts" &&
        identity.provider === "oauth2"
      ) {
        profile.identities.firefox_accounts_id.metadata.display = "private";
        profile.identities.firefox_accounts_id.metadata.last_modified = now;
        profile.identities.firefox_accounts_id.signature.publisher.name =
          PUBLISHER_NAME;
        profile.identities.firefox_accounts_id.value = identity.user_id;

        profile.identities.firefox_accounts_primary_email.metadata.display =
          "private";
        profile.identities.firefox_accounts_primary_email.metadata.last_modified =
          now;
        profile.identities.firefox_accounts_primary_email.signature.publisher.name =
          PUBLISHER_NAME;
        profile.identities.firefox_accounts_primary_email.value =
          event.user.email;
      } else if (
        identity.provider === "ad" &&
        (identity.connection === "Mozilla-LDAP" ||
          identity.connection === "Mozilla-LDAP-Dev")
      ) {
        // Auth0 gets LDAP attributes from the Auth0 LDAP Connector.
        // We've patched the LDAP connector to pass addition LDAP fields
        // https://github.com/mozilla-iam/ad-ldap-connector-rpm/tree/master/patches
        // The Auth0 publisher can't currently publish this attribute as it's not
        // permitted to : https://auth.mozilla.com/.well-known/mozilla-iam-publisher-rules
        // If these publisher rules were to change this could be published by the Auth0
        // publisher. Until then, this value won't be correct until the LDAP publisher
        // updates it.
        // profile.identities.mozilla_ldap_primary_email = user.email;
        // The following fields were previously published by the LDAP publisher
        // when it was tasked with creating new CIS profiles for LDAP users
        // They appear to not be available to this rule as they aren't in the
        // user object and aren't passed by the LDAP connector
        // profile.identities.mozilla_ldap_id = 'mail=jdoe@mozilla.com,o=com,dc=mozilla';
        // profile.identities.mozilla_posix_id = 'jdoe';
        // profile.identities.mozilliansorg_id = null;
      }
    }

    // now, we need to sign every field and subfield
    signAll(profile);

    // turn this on only for debugging
    // console.log(`Generated profile:\n${JSON.stringify(profile, null, 2)}`);
    return profile;
  };

  const getPersonProfile = async (bearerToken) => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      signal: AbortSignal.timeout(PERSONAPI_TIMEOUT),
    };
    const url = `${event.secrets.personapi_url}/v2/user/user_id/${encodeURI(
      USER_ID
    )}?active=any`;

    console.log(`Fetching person profile of ${USER_ID}`);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        // Throw an error if the response status code is not in the 200-299 range
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw Error(`Unable to retrieve profile from Person API: ${error}`);
    }
  };

  const postProfile = async (bearerToken, profile) => {
    console.log(`Posting profile for ${USER_ID} to ChangeAPI`);

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
      signal: AbortSignal.timeout(CHANGEAPI_TIMEOUT),
    };
    const url = `${event.secrets.changeapi_url}/v2/user?user_id=${encodeURI(
      USER_ID
    )}`;

    // POST the profile to the ChangeAPI
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        // Throw an error if the response status code is not in the 200-299 range
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(
        `Successfully created profile for ${event.user.user_id} in ChangeAPI as ${USER_ID}`
      );
      // set their profile as existing in CIS
      setExistsInCIS();
    } catch (error) {
      throw Error(
        `Unable to create profile for ${USER_ID} in ChangeAPI: ${error}`
      );
    }
  };

  const signAll = (profile) => {
    // now we need to sign every attribute in the profile, if we're allowed to
    // otherwise, we will descend one level deep for sub attributes
    // this is super hacky and ugly and I hate it
    Object.values(profile).forEach((attr) => {
      // works because profile is mutable
      if (attr.constructor === Object && attr.signature) {
        signAttribute(attr);
      } else if (attr.constructor === Object && !attr.signature) {
        signAll(attr); // descend deeper
      }
    });
  };

  const signAttribute = (attr) => {
    // we can only sign attributes that access_provider (e.g. auth0) is allowed to sign
    // we also ignore things that don't have a pre-existing signature field
    // we also don't need to sign null attributes
    if (
      !attr.signature ||
      attr.signature.publisher.name !== PUBLISHER_NAME ||
      attr.value === null ||
      attr.values === null
    ) {
      return attr;
    }

    // this is an ugly hack, as the CIS profile currently requires all integers to be cast into strings
    if (attr.value && typeof attr.value === "number") {
      attr.value = attr.value.toString();
    }

    // we need to delete the existing signature and generate it anew
    delete attr.signature;

    attr.signature = {
      additional: [
        {
          alg: "RS256",
          name: null,
          typ: "JWS",
          value: "",
        },
      ],
      publisher: {
        alg: "RS256",
        name: PUBLISHER_NAME,
        typ: "JWS",
        value: jwt.sign(attr, privateKey, {
          algorithm: "RS256",
          noTimestamp: true,
        }),
      },
    };

    return attr;
  };

  const setExistsInCIS = () => {
    // update user metadata to store them existing
    api.user.setAppMetadata("existsInCIS", true);
    console.log(
      `Updated user metadata on ${event.user.user_id} to set existsInCIS`
    );
  };

  // if we get this far, we need to 1) call the PersonAPI to check for existance, and 2) if the user
  // doesn't exist, call the ChangeAPI to create them
  try {
    // Get a bearer token for accessing both PersonAPI and ChangeAPI
    const bearerToken = await getBearerToken();
    // Read the profile, if it exists
    const profile = await getPersonProfile(bearerToken);

    // If the profile already exists, set the existsInCIS in app.metadata
    if (Object.keys(profile).length !== 0) {
      setExistsInCIS();
      console.log(
        `Profile for ${event.user.user_id} already exists in PersonAPI as ${USER_ID}`
      );

      return;
    }

    // Generate a blank profile and populate it with this users data
    const newProfile = createPersonProfile();

    // Submit the newly created profile to ChangeAPI
    await postProfile(bearerToken, newProfile);

    return;
  } catch (err) {
    // Catch error, log it and continue on with workflow
    console.error(err);
    return;
  }
};
