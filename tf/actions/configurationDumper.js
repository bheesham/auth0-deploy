/**
 * @typedef {import('./types/auth0-actions').Event} Event
 * @typedef {import('./types/auth0-actions').Api} Api
 */

/**
 * Auth0 Post Login Action Handler for Configuration Dumper
 * @param {Event} event - The Auth0 event object
 * @param {Api} api - The Auth0 API object
 * @returns {Promise<void>}
 */
exports.onExecutePostLogin = async (event, api) => {
  const _version = process.version;
  const _event = JSON.stringify(event, null, 2);

  console.log("Node Version:", _version);
  console.log("Event Object:");
  console.log(_event);

  return;
};
