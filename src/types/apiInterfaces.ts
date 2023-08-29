import { IPropsProduct } from './componentsInrefaces';

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

export interface IGetProductsResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: IPropsProduct[];
}
