import axios from 'axios';
import { AddressType } from '@/types/types';
import { createAdminJSONHeaders } from './headers';
import ApiEndpoints from '@/enums/apiEndpoints';

export const register = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  dateOfBirth: string,
  addresses: AddressType[],
  defaultShippingAddress: number | string,
  defaultBillingAddress: number | string,
  shippingAddresses: number[],
  billingAddresses: number[]
): Promise<unknown> => {
  // let requestData = {
  //   email,
  //   firstName,
  //   lastName,
  //   password,
  //   dateOfBirth,
  //   addresses,
  //   defaultShippingAddress,
  //   defaultBillingAddress,
  //   shippingAddresses,
  //   billingAddresses,
  // };

  let requestData;
  if (defaultShippingAddress === '' && defaultBillingAddress === '') {
    requestData = {
      email,
      firstName,
      lastName,
      password,
      dateOfBirth,
      addresses,
      shippingAddresses,
      billingAddresses,
    };
  } else if (defaultShippingAddress === '') {
    requestData = {
      email,
      firstName,
      lastName,
      password,
      dateOfBirth,
      addresses,
      defaultBillingAddress,
      shippingAddresses,
      billingAddresses,
    };
  } else if (defaultBillingAddress === '') {
    requestData = {
      email,
      firstName,
      lastName,
      password,
      dateOfBirth,
      addresses,
      defaultShippingAddress,
      shippingAddresses,
      billingAddresses,
    };
  } else {
    requestData = {
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
  }

  const res = await axios.post(ApiEndpoints.URL_CUSTOMERS, requestData, {
    headers: await createAdminJSONHeaders(),
  });

  return res;
};

export const login = async (email: string, password: string): Promise<unknown> => {
  const requestData = {
    email,
    password,
  };

  const res = await axios.post(ApiEndpoints.URL_LOGIN, requestData, {
    headers: await createAdminJSONHeaders(),
  });

  return res;
};
