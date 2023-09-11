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

export const addProduct = async (
  idCart: string,
  versionCart: number,
  productId: string,
  isUser: boolean,
  quantity: number = 1
): Promise<ICart> => {
  const requestData = {
    version: versionCart,
    actions: [
      {
        action: 'addLineItem',
        productId,
        variantId: 1,
        quantity,
      },
    ],
  };

  const res = await axios.post(`${ApiEndpoints.URL_API_ME_CART}/${idCart}`, requestData, {
    headers: isUser ? await createUserJSONHeaders() : await createAnonymousJSONHeaders(),
  });

  return res.data;
};

export const deleteProduct = async (
  idCart: string,
  versionCart: number,
  lineItemId: string,
  isUser: boolean,
  quantity: number = 1
): Promise<ICart> => {
  const requestData = {
    version: versionCart,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId,
        variantId: 1,
        quantity,
      },
    ],
  };

  const res = await axios.post(`${ApiEndpoints.URL_API_ME_CART}/${idCart}`, requestData, {
    headers: isUser ? await createUserJSONHeaders() : await createAnonymousJSONHeaders(),
  });

  return res.data;
};

export const addDiscountCode = async (
  idCart: string,
  versionCart: number,
  isUser: boolean,
  code: string = '3562Y5'
): Promise<ICart> => {
  const requestData = {
    version: versionCart,
    actions: [
      {
        action: 'addDiscountCode',
        code,
      },
    ],
  };

  const res = await axios.post(`${ApiEndpoints.URL_API_ME_CART}/${idCart}`, requestData, {
    headers: isUser ? await createUserJSONHeaders() : await createAnonymousJSONHeaders(),
  });

  return res.data;
};

export const deleteDiscountCode = async (
  idCart: string,
  versionCart: number,
  isUser: boolean,
  codeId: string = '6a807303-da92-48b2-aa59-57b52c334bcf'
): Promise<ICart> => {
  const requestData = {
    version: versionCart,
    actions: [
      {
        action: 'removeDiscountCode',
        discountCode: {
          typeId: 'discount-code',
          id: codeId,
        },
      },
    ],
  };

  const res = await axios.post(`${ApiEndpoints.URL_API_ME_CART}/${idCart}`, requestData, {
    headers: isUser ? await createUserJSONHeaders() : await createAnonymousJSONHeaders(),
  });

  return res.data;
};
