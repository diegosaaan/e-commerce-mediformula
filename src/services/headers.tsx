import { getUserToken } from './tokenHelpers';

export const TOKEN = '4IpVxZKIXf0xJnkLBi7aJrhG1x_IW0GV';
export const CLIENT_ID = 'ilGjRPUuSz9INMW6zL1pqJtl';
export const CLIENT_SECRET = 'hhIZg0aLIDghQAX2aSCyqZ3kZhEsd50K';

export const JSON_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
};

export const URLENCODED_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
};

export const createUserJSONHeaders = async (): Promise<Record<string, string>> => {
  const userToken = await getUserToken();

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  };
};
