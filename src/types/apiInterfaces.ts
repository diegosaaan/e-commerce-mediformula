export interface IApiHeaders {
  Authorization: string;
  'Content-Type': string;
}

export interface ILocalStorageUserTokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface IUserTokenData extends ILocalStorageUserTokenData {
  scope: string;
  token_type: string;
}

export interface IApiIntrospectData {
  active: boolean;
  scope?: string;
  exp?: number;
  client_id?: string;
}

export interface IAuthResponseTokenAdmin {
  access_token: string;
}

export interface ICreateNewUserToken {
  access_token: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  token_type: string;
}

export interface IUserInfo {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: {
    id: string;
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
  }[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  stores: [];
  authenticationMode: 'Password';
}
