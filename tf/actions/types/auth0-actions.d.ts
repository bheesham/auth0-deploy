// Generally from:
// https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/login-trigger/post-login-event-object
//
// The extra fields are from the various identity providers we use
// and from examining the event object in various actions.

export interface Event {
  tenant: {
    id: string;
  };
  user: {
    user_id: string;
    email?: string;
    email_verified?: boolean;
    app_metadata?: Record<string, any> & { groups?: string[] };
    user_metadata?: Record<string, any>;
    picture?: string;
    name?: string;
    nickname?: string;
    given_name?: string;
    family_name?: string;
    identities?: Identity[];
    created_at?: string;
    updated_at?: string;
    last_ip?: string;
    last_login?: string;
    logins_count?: number;
    blocked?: boolean;
    phone_number?: string;
    phone_verified?: boolean;
    multifactor?: string[];
    groups?: string[];  // Some actions use user.groups directly
    ldap_groups?: string[];  // LDAP specific groups
    two_factor_authentication?: boolean;  // GitHub specific
    fxa_twoFactorAuthentication?: boolean;  // Firefox Accounts specific
  };
  client: {
    client_id: string;
    name?: string;
    description?: string;
  };
  connection: {
    id: string;
    name: string;
    strategy: string;
    options?: Record<string, any>;
  };
  request: {
    ip: string;
    user_agent?: string;
    hostname?: string;
    query?: Record<string, string>;
    body?: Record<string, any>;
    geoip?: {
      country_code?: string;
      country_name?: string;
      city_name?: string;
      latitude?: number;
      longitude?: number;
      time_zone?: string;
    };
  };
  secrets: Record<string, string>;
  stats: {
    logins_count: number;
  };
  transaction?: {
    id: string;
    locale: string;
    protocol: string;
    redirect_uri?: string;
    response_mode?: string;
    response_type?: string;
    scope?: string;
    state?: string;
    requested_scopes?: string[];
  };
}

export interface Identity {
  connection: string;
  user_id: string;
  provider: string;
  isSocial: boolean;
  access_token?: string;
  access_token_secret?: string;
  refresh_token?: string;
  profileData?: Record<string, any>;
}

export interface Api {
  access: {
    deny(reason: string): void;
  };
  authentication: {
    challengeWith(challengeType: string, options?: Record<string, any>): void;
    challengeWithAny(challenges: Array<{ type: string; options?: Record<string, any> }>): void;
    recordMethod(method: string): void;
    setPrimaryUser?(userId: string): void;
  };
  idToken: {
    setCustomClaim(name: string, value: any): void;
  };
  accessToken: {
    setCustomClaim(name: string, value: any): void;
  };
  samlResponse: {
    setAttribute(attribute: string, value: string): void;
    setAudience(audience: string): void;
    setCreateUpnClaim(createUpnClaim: boolean): void;
    setIncludeAttributeNameFormat(includeAttributeNameFormat: boolean): void;
    setMapIdentities(mapIdentities: boolean): void;
    setMapUnknownClaimsAsIs(mapUnknownClaimsAsIs: boolean): void;
    setNameIdentifierFormat(nameIdentifierFormat: string): void;
    setNameIdentifierProbes(nameIdentifierProbes: string[]): void;
    setRecipient(recipient: string): void;
    setSigningCert(signingCert: string): void;
    setEncryptionPublicKey?(publicKey: string): void;
    setEncryptionCert?(cert: string): void;
  };
  user: {
    setAppMetadata(key: string, value: any): void;
    setUserMetadata(key: string, value: any): void;
  };
  redirect: {
    sendUserTo(url: string): void;
  };
  cache: {
    get(key: string): string | undefined;
    set(key: string, value: string): void;
  };
  multifactor: {
    enable(provider: string, options?: Record<string, any>): void;
  };
}

export type ActionHandler = (event: Event, api: Api) => Promise<void> | void;

declare global {
  namespace NodeJS {
    interface Global {
      console: Console;
    }
  }
}