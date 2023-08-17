import axios, { AxiosResponse } from 'axios';
import { AddressType } from '@/types/types';

export const BASE_URL_API = 'https://api.europe-west1.gcp.commercetools.com/e-shop230731';
export const BASE_URL_AUTH = 'https://auth.europe-west1.gcp.commercetools.com/oauth/e-shop230731';

export const TOKEN = '4IpVxZKIXf0xJnkLBi7aJrhG1x_IW0GV';

export const TOKEN_USER = localStorage.getItem('token');

const HEADERS_JSON = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
};

const HEADERS_URLENCODED = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: `Basic ${btoa('ilGjRPUuSz9INMW6zL1pqJtl:hhIZg0aLIDghQAX2aSCyqZ3kZhEsd50K')}`,
};

const HEADERS_USER_JSON = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN_USER}`,
};

const checkResponse = (res: AxiosResponse): Promise<unknown> => {
  if (res.status === 200 || res.status === 201) {
    return Promise.resolve(res.data);
  }
  return Promise.reject(res.status);
};

export const register = (
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  dateOfBirth: string,
  addresses: AddressType[],
  defaultShippingAddress: number,
  defaultBillingAddress: number,
  shippingAddresses: number[],
  billingAddresses: number[]
): Promise<unknown> => {
  const requestData = {
    email,
    firstName,
    lastName,
    password,
    dateOfBirth,
    addresses,
    defaultShippingAddress,
    defaultBillingAddress,
    shippingAddresses,
    billingAddresses,
  };

  return axios
    .post(`${BASE_URL_API}/customers`, requestData, {
      headers: HEADERS_JSON,
    })
    .then((res) => checkResponse(res));
};

export const login = (email: string, password: string): Promise<unknown> => {
  const requestData = {
    email,
    password,
  };

  return axios
    .post(`${BASE_URL_API}/login`, requestData, {
      headers: HEADERS_JSON,
    })
    .then((res) => checkResponse(res));
};

export const getToken = (email: string, password: string): Promise<unknown> => {
  const requestData = new URLSearchParams();
  requestData.append('grant_type', 'password');
  requestData.append('username', email);
  requestData.append('password', password);

  return axios
    .post(`${BASE_URL_AUTH}/customers/token`, requestData.toString(), {
      headers: HEADERS_URLENCODED,
    })
    .then((res) => checkResponse(res));
};

export const getUserInfo = (): Promise<unknown> => {
  return axios
    .get(`${BASE_URL_API}/me`, {
      headers: HEADERS_USER_JSON,
    })
    .then((res) => checkResponse(res));
};
