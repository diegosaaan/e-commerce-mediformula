import { getUserToken, getAdminToken } from './tokenHelpers';

export const CLIENT_ID = 'ilGjRPUuSz9INMW6zL1pqJtl';
export const CLIENT_SECRET = 'hhIZg0aLIDghQAX2aSCyqZ3kZhEsd50K';

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
  const userToken = await getUserToken();

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  };
};
