import { AddressType } from '@/types/types';

export const BASE_URL = 'https://api.europe-west1.gcp.commercetools.com/e-shop230731';

const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer 4IpVxZKIXf0xJnkLBi7aJrhG1x_IW0GV',
};

const checkResponse = (res: Response): Promise<unknown> => {
  if (res.ok) {
    return res.json();
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
  return fetch(`${BASE_URL}/customers`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
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
    }),
  }).then((res) => checkResponse(res));
};
