/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import ApiEndpoints from '@/enums/apiEndpoints';
import { URLENCODED_HEADERS, createUserJSONHeaders } from './headers';
import {
  ILocalStorageUserTokenData,
  IApiIntrospectData,
  IUserTokenData,
  IAuthResponseTokenAdmin,
  ICreateNewUserToken,
  IUserInfo,
} from '@/types/apiInterfaces';

export const isUserToken = (): boolean => localStorage.getItem('1SortUserToken') !== null;
export const isAnonymousToken = (): boolean => localStorage.getItem('1SortAnonymousToken') !== null;

export const isTokenActive = async (name: string): Promise<boolean> => {
  const dataFromLocalStorage = localStorage.getItem(name);
  if (dataFromLocalStorage) {
    const { access_token }: ILocalStorageUserTokenData = JSON.parse(dataFromLocalStorage);
    const {
      data: { active },
    }: { data: IApiIntrospectData } = await axios.post(`${ApiEndpoints.URL_AUTH_INTROSPECT}`, `token=${access_token}`, {
      headers: URLENCODED_HEADERS,
    });
    return active;
  }
  return false;
};

export const saveUserToken = async (
  { access_token, refresh_token, expires_in }: ILocalStorageUserTokenData,
  name: string
): Promise<void> => {
  localStorage.setItem(name, JSON.stringify({ access_token, refresh_token, expires_in }));
};

export const createNewUserToken = async (email: string, password: string): Promise<ICreateNewUserToken> => {
  const requestData = new URLSearchParams();
  requestData.append('grant_type', 'password');
  requestData.append('username', email);
  requestData.append('password', password);

  const res = await axios.post(ApiEndpoints.URL_AUTH_CUSTOMERS_TOKEN, requestData.toString(), {
    headers: URLENCODED_HEADERS,
  });

  return res.data;
};

export const refreshUserToken = async (refreshToken: string, endpoint: string): Promise<unknown> => {
  const requestData = new URLSearchParams();
  requestData.append('grant_type', 'refresh_token');
  requestData.append('refresh_token', refreshToken);

  const res = await axios.post(endpoint, requestData.toString(), {
    headers: URLENCODED_HEADERS,
  });

  return res.data;
};

export const getUserToken = async (name: string, endpoint: string): Promise<string | null> => {
  let tokenData: ILocalStorageUserTokenData | null = null;

  const tokenDataString = localStorage.getItem(name);

  if (tokenDataString !== null) {
    tokenData = JSON.parse(tokenDataString) as ILocalStorageUserTokenData;
  }

  if (tokenData && !(await isTokenActive(name))) {
    const { refresh_token } = tokenData;
    const newTokenData = (await refreshUserToken(refresh_token, endpoint)) as IUserTokenData;
    saveUserToken(newTokenData, name);
    return newTokenData.access_token;
  }

  return tokenData?.access_token || null;
};

export const getUserInfoByToken = async (): Promise<IUserInfo> => {
  const userJSONHeaders = await createUserJSONHeaders();

  const res = await axios.get(ApiEndpoints.URL_API_ME, {
    headers: userJSONHeaders,
  });

  return res.data;
};

export const getAdminToken = async (): Promise<string> => {
  const requestData = new URLSearchParams();
  requestData.append('grant_type', 'client_credentials');

  const res = await axios.post<IAuthResponseTokenAdmin>(ApiEndpoints.URL_AUTH_TOKEN_ADMIN, requestData.toString(), {
    headers: URLENCODED_HEADERS,
  });

  return res.data.access_token;
};

export const createAnonymousToken = async (): Promise<string> => {
  const requestData = new URLSearchParams();
  requestData.append('grant_type', 'client_credentials');

  const res = await axios.post(ApiEndpoints.URL_ANONYMOUS_TOKEN, requestData.toString(), {
    headers: URLENCODED_HEADERS,
  });

  return res.data;
};
