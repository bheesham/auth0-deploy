const {
  onExecuteCredentialsExchange,
} = require("../actions/dinoparkAPIShim.js");

beforeEach(() => {
  api = {
    accessToken: {
      setCustomClaim: jest.fn(),
    },
    access: {
      deny: jest.fn(),
    },
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

test("Should not touch non-dinopark clients", async () => {
  const ev = {
    client: {
      metadata: {},
    },
  };
  await onExecuteCredentialsExchange(ev, api);
  expect(api.accessToken.setCustomClaim).not.toHaveBeenCalled();
});

test("Should set custom claims on dinopark clients", async () => {
  const ev = {
    client: {
      metadata: {
        kind: "dinopark",
        userId: "ad|Mozilla-LDAP|bpersaud",
        groups: "team_moco",
        trust: "MEDIUM",
      },
    },
  };
  await onExecuteCredentialsExchange(ev, api);
  expect(api.accessToken.setCustomClaim).toHaveBeenCalled();
});

test("Should fail with invalid user", async () => {
  const ev = {
    client: {
      metadata: {
        kind: "dinopark",
        groups: "team_moco",
        trust: "MEDIUM",
      },
    },
  };
  await onExecuteCredentialsExchange(ev, api);
  expect(api.access.deny).toHaveBeenCalled();
});

test("Should fail with unknown trust", async () => {
  const ev = {
    client: {
      metadata: {
        kind: "dinopark",
        userId: "ad|Mozilla-LDAP|bpersaud",
        groups: "team_moco",
        trust: "MAXIMOM",
      },
    },
  };
  await onExecuteCredentialsExchange(ev, api);
  expect(api.access.deny).toHaveBeenCalled();
});
