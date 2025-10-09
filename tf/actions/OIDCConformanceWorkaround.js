/**
 * @typedef {import('./types/auth0-actions').Event} Event
 * @typedef {import('./types/auth0-actions').Api} Api
 */

/**
 * Auth0 Post Login Action Handler for OIDC Conformance Workaround
 * @param {Event} event - The Auth0 event object
 * @param {Api} api - The Auth0 API object
 * @returns {Promise<void>}
 */
exports.onExecutePostLogin = async (event, api) => {
  console.log("Running action:", "OIDCConformanceWorkaround");

  // This issue only affects certain application
  var apps = [
    "UCOY390lYDxgj5rU8EeXRtN6EP005k7V", // sso dashboard prod
    "2KNOUCxN8AFnGGjDCGtqiDIzq8MKXi2h", // sso dashboard allizom
  ];

  if (apps.indexOf(event.client.client_id) >= 0) {
    // Fix http://openid.net/specs/openid-connect-implicit-1_0.html#StandardClaims
    // This ensures updated_at is an INTEGER (timestamp since the epoch) and not a string
    // So that libraries that follow the OpenID Connect spec function as intended.
    if (event.user.updated_at) {
      api.idToken.setCustomClaim(
        `updated_at`,
        Math.floor(Number(new Date(event.user.updated_at)) / 1000)
      );
    }
    return;
  }
  return;
};
