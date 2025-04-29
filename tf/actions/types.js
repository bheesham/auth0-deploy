/**
 * Schema from
 *
 *     https://github.com/mozilla-iam/sso-dashboard/blob/ae07d478a9beea0dcb000fb7290ad20409265b9f/dashboard/models/apps.py
 *
 * @typedef {Object} Application
 * @property {string} name
 * @property {string} op
 * @property {string} url
 * @property {string} logo
 * @property {boolean} display
 * @property {?string} client_id
 * @property {?string[]} vanity_url
 * @property {string[]} authorized_users
 * @property {string[]} authorized_groups
 * @property {?string} AAL
 */

/**
 * @typedef {Object} App
 * @property {Application} application
 */

/**
 * @typedef {Object} ProfileData
 * @property {string} [email]
 * @property {boolean} [email_verified]
 * @property {string} [name]
 * @property {string} [given_name]
 * @property {string} [family_name]
 * @property {string} [picture]
 * @property {string} [locale]
 * @property {boolean} [fxa_twoFactorAuthentication]
 * @property {boolean} [two_factor_authentication]
 * @property {string[]} [groups]
 */

/**
 * @typedef {Object} Identity
 * @property {string} user_id
 * @property {string} provider
 * @property {string} connection
 * @property {boolean} isSocial
 * @property {ProfileData} profileData
 */

/**
 * @typedef {Object} User
 * @property {string} user_id
 * @property {string} email
 * @property {boolean} email_verified
 * @property {any} app_metadata
 * @property {Array.<Identity>} identities
 * @property {Array.<string>} [ldap_groups]
 * @property {Array.<string>} [groups]
 * @property {Array.<string>} [multifactor]
 * @property {boolean} [two_factor_authentication]
 * @property {boolean} [fxa_twoFactorAuthentication]
 * @property {boolean} [two_factor_authentication]
 * @property {?Array.<string>} [aai]
 */

/**
 * @typedef {Object} Secrets
 * @property {string} [jwtMsgsRsaSkey]
 * @property {string} [accessKeyId]
 * @property {string} [secretAccessKey]
 * @property {string} [duo_skey_mozilla]
 * @property {string} [duo_ikey_mozilla]
 * @property {string} [duo_apihost_mozilla]
 */

/**
 * @typedef {Object} Connection
 * @property {string} id
 * @property {string} name
 * @property {string} strategy
 * @property {any} metadata
 */

/**
 * @typedef {Object} Client
 * @property {string} client_id
 * @property {string} name
 */

/**
 * @typedef {Object} Transaction
 * @property {string} [redirect_uri]
 * @property {string[]} requested_scopes
 */

/**
 * @typedef {Object} Tenant
 * @property {string} id
 */

/**
 * @typedef {Object} PreLoginEvent
 * @property {Tenant} tenant
 * @property {User} user
 * @property {Secrets} secrets
 * @property {Connection} connection
 * @property {Client} client
 * @property {Transaction} transaction
 */
