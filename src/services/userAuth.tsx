import axios, { AxiosResponse } from 'axios';
import { AddressType } from '@/types/types';
import { JSON_HEADERS } from './headers';
import ApiEndpoints from '@/enums/apiEndpoints';

export const checkResponse = (res: AxiosResponse): Promise<unknown> => {
  if (res.status === 200 || res.status === 201) {
    return Promise.resolve(res.data);
  }
  return Promise.reject(res.status);
};

export const register = async (
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

  const res = await axios.post(ApiEndpoints.URL_CUSTOMERS, requestData, {
    headers: JSON_HEADERS,
  });
  return checkResponse(res);
};

export const login = async (email: string, password: string): Promise<unknown> => {
  const requestData = {
    email,
    password,
  };

  const res = await axios.post(ApiEndpoints.URL_LOGIN, requestData, {
    headers: JSON_HEADERS,
  });
  return checkResponse(res);
};
