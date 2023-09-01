import axios from 'axios';
import { createUserJSONHeaders } from '../headers';
import ApiEndpoints from '@/enums/apiEndpoints';
import { IUserInfo } from '@/types/apiInterfaces';

export const addAddress = async (
  version: number,
  streetName: string,
  postalCode: string,
  city: string,
  country: string
): Promise<IUserInfo> => {
  const requestData = {
    version,
    actions: [
      {
        action: 'addAddress',
        address: {
          streetName,
          postalCode,
          city,
          country,
        },
      },
    ],
  };

  const res = await axios.post(ApiEndpoints.URL_API_ME, requestData, {
    headers: await createUserJSONHeaders(),
  });

  return res.data;
};

export const addAddressShipping = async (version: number, addressId: string): Promise<IUserInfo> => {
  const requestData = {
    version,
    actions: [
      {
        action: 'addShippingAddressId',
        addressId,
      },
    ],
  };

  const res = await axios.post(ApiEndpoints.URL_API_ME, requestData, {
    headers: await createUserJSONHeaders(),
  });

  return res.data;
};

export const addAddressBilling = async (version: number, addressId: string): Promise<IUserInfo> => {
  const requestData = {
    version,
    actions: [
      {
        action: 'addBillingAddressId',
        addressId,
      },
    ],
  };

  const res = await axios.post(ApiEndpoints.URL_API_ME, requestData, {
    headers: await createUserJSONHeaders(),
  });

  return res.data;
};
