/* This is only for groups. Other customizations are still dealt with in
 * `samlMappings.js`.
 *
 * The reason to pull this out into its own action is because this logic
 * is duplicated across `accessRules.js` as well. This cause(s/d) OIDC and
 * SAML to say a user is in different groups -- namely "everyone".
 *
 * We'll, of course, still need to access a user's groups for authz, but this
 * action's primary concern is ensuring RPs get an accurate list. So not
 * _everything_ related to groups should be here.
 */
const auth0 = require("auth0");

const SAML_ATTRIBUTE_GROUP = "http://schemas.xmlsoap.org/claims/Group";
const JWT_CLAIM_GROUP = "https://sso.mozilla.com/claim/groups";

const tines = (groups) => {
  const tineGroups = new Set([
    "mozilliansorg_sec_tines-admin",
    "mozilliansorg_sec_tines-access",
    "team_moco",
    "team_mofo",
    "team_mozorg",
    "team_mzla",
    "team_mzai",
    "team_mzvc",
  ]);
  return {
    groups: tineGroups.intersection(groups),
    withoutEveryone: true,
    saml: {
      create: ["http://sso.mozilla.com/claim/groups"],
      remove: [SAML_ATTRIBUTE_GROUP],
    },
  };
};

const identity = (groups) => {
  return {
    groups,
  };
};

const onlyPrefixed = (groups, prefix) => {
  return new Set(
    groups
      .values()
      .filter((g) => g.startsWith(prefix))
      .map((g) => g.slice(prefix.length))
  );
};

// Groups: grants access to projects. These aren't that special, but do start
// with `mozilliansorg_workato_workspace_group-`.
//
// The `prefix` const should be kept in sync with PeopleMo and apps.yml.  Since
// PeopleMo only deals with groups, we have to split up, by some convention,
// the difference between Roles and Groups as Workato expects them.
const workatoWorkspace = (groups) => {
  return {
    groups: onlyPrefixed(groups, "mozilliansorg_workato_workspace_group-"),
    saml: {
      create: ["workato_user_groups"],
      remove: [SAML_ATTRIBUTE_GROUP],
    },
  };
};

// And similarly to above (Workato Workspace), Workato expects custom
// attributes to be set. We do some extra work to strip our internal group
// prefix.
const workatoIdentity = (groups) => {
  return {
    groups: onlyPrefixed(groups, "mozilliansorg_workato_user-"),
    saml: {
      create: ["workato_end_user_groups"],
      remove: [SAML_ATTRIBUTE_GROUP],
    },
  };
};

// Should return something in the shape of:
//
// ```
// {
//   groups: list<string>,
//   withoutEveryone: bool,
//   saml?: {
//     create?: list<string>,
//     remove?: list<string>,
//   }
// ```
const customize = (clientId) => {
  switch (clientId) {
    case "cPH0znP4n74JvPf9Efc1w6O8KQWwT634":
    case "cDof40r4Uvde1xGs8i30HYnekOkIglN6":
      return tines;
    case "JmJAOmGbtZsojMpFQC5fcmqghWHbuKrf":
      return workatoWorkspace;
    case "qXfKerLoU8w8FN76OB9Yt7I6w2N8lD2Y":
      return workatoIdentity;
    default:
      return identity;
  }
};

// The SAML bits are a bit more complicated. We allow:
//
// * creating multiple attributes for groups;
// * removing multiple attributes for groups.
//
// If the customization function doesn't tell us the attribute name to use for
// groups, we'll read it from how the SAML addon is configured.
const samlDo = async (event, api, saml, groups) => {
  const domain =
    event.tenant.id === "dev"
      ? "dev.mozilla-dev.auth0.com"
      : "auth.mozilla.auth0.com";
  // Specify all group attributes to assert in `saml.create`.
  // If none are specified, we'll use whatever the default is.
  if (saml?.create) {
    for (const c of saml.create) {
      api.samlResponse.setAttribute(c, groups);
    }
  } else {
    // There's nothing we can really do if the call below fails. A mitigation
    // for this would be to add customizations for each client, which would
    // end up skipping this branch.
    // If this fails, our fallback is Auth0's default handling. This'll likely
    // mean no "everyone" group.
    const mgmt = new auth0.ManagementClient({
      domain,
      clientId: event.secrets.mgmtClientId,
      clientSecret: event.secrets.mgmtClientSecret,
      scope: "read:clients",
    });
    let client;
    try {
      client = await mgmt.clients.get({
        client_id: event.client.client_id,
      });
    } catch (err) {
      console.error("Error fetching client info:", err);
      console.warn("Falling back to default handling.");
      return;
    }
    // Auth0 allows you to specify an array in the mappings. But, that's not
    // very common.
    const samlAttributeGroup =
      client.data?.addons?.samlp?.mappings?.groups || SAML_ATTRIBUTE_GROUP;
    if (Array.isArray(samlAttributeGroup)) {
      for (const m of samlAttributeGroup) {
        api.samlResponse.setAttribute(m, groups);
      }
    } else {
      api.samlResponse.setAttribute(samlAttributeGroup, groups);
    }
  }
  if (saml?.remove) {
    for (const r of saml.remove) {
      api.samlResponse.setAttribute(r, null);
    }
  }
};

exports.onExecutePostLogin = async (event, api) => {
  // Get a list of all the groups associated with this user.
  const identityGroups =
    event.user.identities?.flatMap((i) => i.profileData?.groups || []) || [];
  const groupsAll = new Set([
    ...(event.user.app_metadata?.groups || []),
    ...(event.user.ldap_groups || []),
    ...(event.user.groups || []),
    ...identityGroups,
  ]);
  const groupsCustomizationFn = customize(event.client.client_id);
  let { groups, saml, withoutEveryone } = groupsCustomizationFn(groupsAll);
  // The default is to include everyone, unless a specific customization says
  // we shouldn't.
  if (!Boolean(withoutEveryone)) {
    groups.add("everyone");
  }
  const groupsFinal = Array.from(groups);
  // ref: https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/login-trigger/post-login-event-object#param-protocol
  if (event.transaction.protocol === "samlp") {
    await samlDo(event, api, saml, groupsFinal);
  } else {
    const scopesRequested = event.transaction.requested_scopes || [];
    const shouldAddClaim = scopesRequested.some(
      (s) => s === "profile" || s.startsWith("https://")
    );
    if (shouldAddClaim) {
      api.idToken.setCustomClaim(JWT_CLAIM_GROUP, groupsFinal);
    }
  }
};
