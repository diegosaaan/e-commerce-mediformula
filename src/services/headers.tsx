import { getUserToken, getAdminToken } from './tokenHelpers';
import ApiEndpoints from '@/enums/apiEndpoints';

export const CLIENT_ID = 'x1l8wnSux4JIj6QChQOOIkYP';
export const CLIENT_SECRET = 'DyT73J3nPiD6_1FjcmlPSju1j3oZ0lZ-';

export const URLENCODED_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
};

export const createAdminJSONHeaders = async (): Promise<Record<string, string>> => {
  const adminToken = await getAdminToken();

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${adminToken}`,
  };
};

export const createUserJSONHeaders = async (): Promise<Record<string, string>> => {
  const userToken = await getUserToken('1SortUserToken', ApiEndpoints.URL_AUTH_TOKEN);

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  };
};

export const createAnonymousJSONHeaders = async (): Promise<Record<string, string>> => {
  const userToken = await getUserToken('1SortAnonymousToken', ApiEndpoints.URL_ANONYMOUS_TOKEN);

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  };
};
