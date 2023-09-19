import axios, { AxiosError } from 'axios';
import { AddressType } from '@/types/types';
import { createAdminJSONHeaders } from './headers';
import ApiEndpoints from '@/enums/apiEndpoints';
import { getActiveCart } from './cart';

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

  return res.data;
};

export const login = async (email: string, password: string): Promise<unknown> => {
  let requestData;

  try {
    const activeCart = await getActiveCart(false);
    requestData = {
      email,
      password,
      anonymousCart: {
        id: activeCart.id,
        typeId: 'cart',
      },
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 401) {
      requestData = {
        email,
        password,
      };
    } else {
      console.error('Произошла ошибка:', error);
    }
  }

  const res = await axios.post(ApiEndpoints.URL_LOGIN, requestData, {
    headers: await createAdminJSONHeaders(),
  });

  return res.data;
};
