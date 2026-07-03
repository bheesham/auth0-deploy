const _ = require("lodash");
const idTokenObj = require("./modules/idToken.json");
const eventObj = require("./modules/event.json");
const { onExecutePostLogin } = require("../actions/assertGroups.js");

jest.mock("auth0");

var _event;
var _idToken;
var _samlAttributes;
var api;

beforeEach(() => {
  _event = {
    ..._.cloneDeep(eventObj),
    secrets: {
      mgmtClientId: "foo",
      mgmtClientSecret: "bar",
    },
  };
  _idToken = _.cloneDeep(idTokenObj);
  _samlAttributes = {};
  api = {
    samlResponse: {
      setAttribute: jest.fn((k, v) => {
        if (v == null) {
          delete _samlAttributes[k];
          return;
        }
        _samlAttributes[k] = v;
      }),
    },
    idToken: {
      setCustomClaim: jest.fn((k, v) => (_idToken[k] = v)),
    },
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Tines SAML tests", () => {
  const clientIDs = [
    "cPH0znP4n74JvPf9Efc1w6O8KQWwT634",
    "cDof40r4Uvde1xGs8i30HYnekOkIglN6",
  ];

  test.each(clientIDs)(
    "Ensure SAML configuration mappings for client %s",
    async (clientID) => {
      _event.transaction.protocol = "samlp";
      _event.client.client_id = clientID;

      _event.user.app_metadata = {};
      _event.user.app_metadata.groups = [
        "mozilliansorg_sec_tines-admin",
        "foo",
        "mozilliansorg_sec_tines-access",
        "bar",
        "team_moco",
        "team_mofo",
        "team_mozorg",
        "team_mzla",
        "team_mzai",
        "team_mzvc",
      ];

      const expectedSamlAttributes = {
        "http://sso.mozilla.com/claim/groups": [
          "mozilliansorg_sec_tines-admin",
          "mozilliansorg_sec_tines-access",
          "team_moco",
          "team_mofo",
          "team_mozorg",
          "team_mzla",
          "team_mzai",
          "team_mzvc",
        ],
      };

      // Execute onExecutePostLogin
      await onExecutePostLogin(_event, api);

      expect(api.samlResponse.setAttribute).toHaveBeenCalled();
      expect(_samlAttributes).toEqual(expectedSamlAttributes);
    }
  );
});

describe("Test group merges", () => {
  test("Expect user.groups to be a merged list of multiple group lists", async () => {
    _event.client.client_id = "client00000000000000000000000005";
    _event.transaction.requested_scopes = ["email", "profile"];
    _event.user.aai = ["2FA"];
    _event.user.groups = ["groups_1", "groups_2"];
    _event.user.ldap_groups = ["ldap_groups_1", "ldap_groups_2"];
    _event.user.app_metadata.groups = [
      "app_metadata_groups_1",
      "app_metadata_groups_2",
    ];

    const mergedGroups = [
      "everyone",
      "groups_1",
      "groups_2",
      "ldap_groups_1",
      "ldap_groups_2",
      "app_metadata_groups_1",
      "app_metadata_groups_2",
    ];
    await onExecutePostLogin(_event, api);

    // Ensure _user.groups is a subset of mergedGroups and vice versa
    expect(_idToken["https://sso.mozilla.com/claim/groups"]).toEqual(
      expect.arrayContaining(mergedGroups)
    );
    expect(mergedGroups).toEqual(
      expect.arrayContaining(_idToken["https://sso.mozilla.com/claim/groups"])
    );

    // Additionally, check if they have the same length to ensure no duplicates
    expect(_idToken["https://sso.mozilla.com/claim/groups"]).toHaveLength(
      mergedGroups.length
    );
  });
});

describe("Braintree SAML tests", () => {
  const clientIDs = ["x7TF6ZtJev4ktoHR4ObWmA9KeqGni6rq"];
  test.each(clientIDs)(
    "Ensure SAML configuration mappings for client %s",
    async (clientID) => {
      _event.client.client_id = clientID;
      _event.transaction.protocol = "samlp";
      expectedSamlAttributes = {
        roles: ["everyone"],
      };
      // Execute onExecutePostLogin
      await onExecutePostLogin(_event, api);
      expect(api.samlResponse.setAttribute).toHaveBeenCalled();
      expect(_samlAttributes).toEqual(expectedSamlAttributes);
    }
  );
});

describe("Workato Workspace", () => {
  const clientIDs = ["JmJAOmGbtZsojMpFQC5fcmqghWHbuKrf"];
  test.each(clientIDs)(
    "Ensure SAML configuration mappings for client %s",
    async (clientID) => {
      _event.transaction.protocol = "samlp";
      _event.user.app_metadata = {
        groups: ["mozilliansorg_workato_workspace_group-foobar"],
      };
      _event.client.client_id = clientID;
      const expectedSamlAttributes = {
        workato_user_groups: ["foobar", "everyone"],
      };
      await onExecutePostLogin(_event, api);
      expect(api.samlResponse.setAttribute).toHaveBeenCalled();
      expect(_samlAttributes).toEqual(expectedSamlAttributes);
    }
  );
});
