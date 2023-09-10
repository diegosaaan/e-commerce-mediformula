import axios from 'axios';
import { createAnonymousJSONHeaders, createUserJSONHeaders } from './headers';
import ApiEndpoints from '@/enums/apiEndpoints';
import { ICart } from '@/types/apiInterfaces';

export const createCart = async (isUser: boolean): Promise<ICart> => {
  const requestData = {
    currency: 'RUB',
  };

  const res = await axios.post(ApiEndpoints.URL_API_ME_CART, requestData, {
    headers: isUser ? await createUserJSONHeaders() : await createAnonymousJSONHeaders(),
  });

  return res.data;
};

export const getActiveCart = async (isUser: boolean): Promise<ICart> => {
  const res = await axios.get(ApiEndpoints.URL_API_ME_CART_ACTIVE, {
    headers: isUser ? await createUserJSONHeaders() : await createAnonymousJSONHeaders(),
  });

  return res.data;
};

export const addProductInCart = async (
  idCart: string,
  versionCart: number,
  idProduct: string,
  isUser: boolean
): Promise<ICart> => {
  const requestData = {
    version: versionCart,
    actions: [
      {
        action: 'addLineItem',
        productId: idProduct,
        variantId: 1,
        quantity: 1,
      },
    ],
  };

  const res = await axios.post(`${ApiEndpoints.URL_API_ME_CART}/${idCart}`, requestData, {
    headers: isUser ? await createUserJSONHeaders() : await createAnonymousJSONHeaders(),
  });

  return res.data;
};
