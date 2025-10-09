/**
 * @typedef {import('./types/auth0-actions').Event} Event
 * @typedef {import('./types/auth0-actions').Api} Api
 */

/**
 * Auth0 Post Login Action Handler (Deprecated)
 * @param {Event} event - The Auth0 event object
 * @param {Api} api - The Auth0 API object
 * @returns {Promise<void>}
 */
exports.onExecutePostLogin = async (event, api) => {
  console.log("Deprecated, not needed.");
};

/**
 * Auth0 Continue Post Login Action Handler
 * @param {Event} event - The Auth0 event object
 * @param {Api} api - The Auth0 API object
 * @returns {Promise<void>}
 */
exports.onContinuePostLogin = async (event, api) => {
  // Since we do not use the /continue endpoint let's make sure we explictly fail with an UnauthorizedError
  // otherwise it is possible to continue the session even after a postError redirect is set.
  return api.access.deny("The /continue endpoint is not allowed");
};
