// Because we don't have native API support in DinoPark, we have to fake it
// here.
//
// All of the claims are properties of the M2M client we create in Auth0,
// so we don't have to worry _too_ much about invalid input (but we still
// do some basic cleaning up).
//
// The code here should be _mostly_ what it looks like when we're all done.

// We specifify a namespace for our custom claims to avoid overlapping with
// OAuth/OIDC/JWT and Auth0 stuff [RFC 7519] [Auth0].
//
// See also:
//
// * https://auth0.com/docs/customize/actions/explore-triggers/credentials-exchange
// * https://auth0.com/docs/actions/reference/credentials-exchange/credentials-exchange-event-object
// * https://auth0.com/docs/actions/reference/credentials-exchange/credentials-exchange-api-object
//
// [RFC 7519]: https://www.rfc-editor.org/info/rfc7519/#section-4.3
// [Auth0]: https://auth0.com/docs/secure/tokens/json-web-tokens/create-custom-claims#namespaced-guidelines
const NAMESPACE = "https://sso.mozilla.com/claim";
const TRUST_LEVELS = ["LOW", "MEDIUM", "HIGH", "MAXIMUM"];

exports.onExecuteCredentialsExchange = async (event, api) => {
  // If we need to support multiple kinds of API clients, we'll need to do
  // something similar to what we do for GitHub and AWS. Each of those would
  // need their own logic for claims, probably.
  if (event.client.metadata.kind !== "dinopark") {
    return;
  }

  const userId = event.client.metadata.userId;
  if (userId === undefined || userId.trim().length === 0) {
    return api.access.deny("invalid_request", "no associated user");
  }

  // Most actions in dinopark require `MEDIUM` trust.
  // See also:
  //
  // * https://github.com/mozilla-iam/dino-park-packs/blob/6acd5fd8a4f659a6ca5d5b67855a36a83240a6b4/src/api/admins.rs#L47
  // * https://github.com/mozilla-iam/dino-park-packs/blob/6acd5fd8a4f659a6ca5d5b67855a36a83240a6b4/src/api/invitations.rs#L78
  // * https://github.com/mozilla-iam/dino-park-packs/blob/6acd5fd8a4f659a6ca5d5b67855a36a83240a6b4/src/api/sudo.rs#L55
  const trust = event.client.metadata.trust;
  if (!TRUST_LEVELS.includes(trust)) {
    return api.access.deny("invalid_request", `unknown trust level: ${trust}`);
  }

  // POTENTIAL DEBT: Values in Auth0 are limited to 255 characters. If the
  // group list becomes long enough, we'll need to figure out a better way.
  //
  // If we notice that we always need some groups (e.g. `team_moco`), we could
  // bake it in here.
  const groupsRaw = event.client.metadata.groups ?? "";
  const groups = groupsRaw.split(",").map((g) => g.trim());

  // We can't override the `sub` claim, so we'll need to set a custom claim
  // and update dino-park-gate to understand it.
  api.accessToken.setCustomClaim(`${NAMESPACE}/subject_assumed`, userId);
  api.accessToken.setCustomClaim(`${NAMESPACE}/AAL`, trust);
  api.accessToken.setCustomClaim(`${NAMESPACE}/groups`, groups);
  console.log(
    `dinopark creds for ${userId}, with trust ${trust} and groups: ${groupsRaw}`
  );
};
