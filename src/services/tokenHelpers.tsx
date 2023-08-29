/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import ApiEndpoints from '@/enums/apiEndpoints';
import { URLENCODED_HEADERS, createUserJSONHeaders } from './headers';
import {
  ILocalStorageUserTokenData,
  IApiIntrospectData,
  IUserTokenData,
  IAuthResponseTokenAdmin,
} from '@/types/apiInterfaces';

export const isUserToken = (): boolean => localStorage.getItem('1SortUserToken') !== null;

export const isTokenActive = async (): Promise<boolean> => {
  const dataFromLocalStorage = localStorage.getItem('1SortUserToken');
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

export const saveUserToken = ({ access_token, refresh_token, expires_in }: ILocalStorageUserTokenData): void => {
  localStorage.setItem('1SortUserToken', JSON.stringify({ access_token, refresh_token, expires_in }));
};

export const createNewUserToken = async (email: string, password: string): Promise<unknown> => {
  const requestData = new URLSearchParams();
  requestData.append('grant_type', 'password');
  requestData.append('username', email);
  requestData.append('password', password);

  const res = await axios.post(ApiEndpoints.URL_AUTH_CUSTOMERS_TOKEN, requestData.toString(), {
    headers: URLENCODED_HEADERS,
  });

  return res.data;
};

export const refreshUserToken = async (refreshToken: string): Promise<unknown> => {
  const requestData = new URLSearchParams();
  requestData.append('grant_type', 'refresh_token');
  requestData.append('refresh_token', refreshToken);

  const res = await axios.post(ApiEndpoints.URL_AUTH_CUSTOMERS_TOKEN, requestData.toString(), {
    headers: URLENCODED_HEADERS,
  });

  return res;
};

export const getUserToken = async (): Promise<string | null> => {
  let tokenData: ILocalStorageUserTokenData | null = null;

  const tokenDataString = localStorage.getItem('1SortUserToken');

  if (tokenDataString !== null) {
    tokenData = JSON.parse(tokenDataString) as ILocalStorageUserTokenData;
  }

  if (tokenData && !(await isTokenActive())) {
    const { refresh_token } = tokenData;
    const newTokenData = (await refreshUserToken(refresh_token)) as IUserTokenData;
    saveUserToken(newTokenData);
    return newTokenData.access_token;
  }

  return tokenData?.access_token || null;
};

export const getUserInfoByToken = async (): Promise<unknown> => {
  const userJSONHeaders = await createUserJSONHeaders();

  const res = await axios.get(ApiEndpoints.URL_API_ME, {
    headers: userJSONHeaders,
  });

  return res;
};

export const getAdminToken = async (): Promise<string> => {
  const requestData = new URLSearchParams();
  requestData.append('grant_type', 'client_credentials');

  const res = await axios.post<IAuthResponseTokenAdmin>(ApiEndpoints.URL_AUTH_TOKEN_ADMIN, requestData.toString(), {
    headers: URLENCODED_HEADERS,
  });

  return res.data.access_token;
};
