import axios, { AxiosError } from 'axios';
import { createAdminJSONHeaders, createAnonymousJSONHeaders, createUserJSONHeaders } from './headers';
import ApiEndpoints from '@/enums/apiEndpoints';
import { ICart, IUserTokenData } from '@/types/apiInterfaces';
import { createAnonymousToken, saveUserToken } from './tokenHelpers';
import handleErrors from '@/utils/helpers/errorHandlers/errorHandlers';

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

export const getDiscountCodeByID = async (id: string): Promise<unknown> => {
  const res = await axios.get(`${ApiEndpoints.URL_API_DISCOUNT_CODE}/${id}`, {
    headers: await createAdminJSONHeaders(),
  });

  return res.data;
};

export const getCartDiscountByID = async (id: string): Promise<unknown> => {
  const res = await axios.get(`${ApiEndpoints.URL_API_CART_DISCOUNT}/${id}`, {
    headers: await createAdminJSONHeaders(),
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

export const handleDeleteProduct = async (id: string, quantity: number = 1): Promise<ICart | null> => {
  const userToken = localStorage.getItem('1SortUserToken');
  const anonymousToken = localStorage.getItem('1SortAnonymousToken');

  try {
    if (userToken) {
      const cartActive = await getActiveCart(true);
      const lineItemsId = cartActive.lineItems.filter((item) => item.productId === id);
      const cart = await deleteProduct(cartActive.id, cartActive.version, lineItemsId[0].id, true, quantity);
      return cart;
    }

    if (anonymousToken) {
      const cartActive = await getActiveCart(false);
      const lineItemsId = cartActive.lineItems.filter((item) => item.productId === id);
      const cart = await deleteProduct(cartActive.id, cartActive.version, lineItemsId[0].id, false, quantity);
      return cart;
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (
      axiosError.response &&
      axiosError.response.data &&
      typeof axiosError.response.data === 'object' &&
      'statusCode' in axiosError.response.data &&
      'message' in axiosError.response.data
    ) {
      const { statusCode, message: errorMessage } = axiosError.response.data;

      if (typeof statusCode === 'number' && typeof errorMessage === 'string') {
        handleErrors(statusCode, errorMessage);
      }
    }
  }

  return Promise.resolve(null);
};

export const handleAddProduct = async (id: string, quantity: number = 1): Promise<ICart | null> => {
  const userToken = localStorage.getItem('1SortUserToken');
  const anonymousToken = localStorage.getItem('1SortAnonymousToken');

  try {
    if (userToken) {
      const cartActive = await getActiveCart(true);
      const cart = await addProduct(cartActive.id, cartActive.version, id, true, quantity);
      return cart;
    }

    if (anonymousToken) {
      const cartActive = await getActiveCart(false);
      const cart = await addProduct(cartActive.id, cartActive.version, id, false, quantity);
      return cart;
    }

    const result = await createAnonymousToken();
    if (result !== null && typeof result === 'object') {
      saveUserToken(result as IUserTokenData, '1SortAnonymousToken');
      const cartCreated = await createCart(false);
      const cart = await addProduct(cartCreated.id, cartCreated.version, id, false, quantity);
      return cart;
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (
      axiosError.response &&
      axiosError.response.data &&
      typeof axiosError.response.data === 'object' &&
      'statusCode' in axiosError.response.data &&
      'message' in axiosError.response.data
    ) {
      const { statusCode, message: errorMessage } = axiosError.response.data;

      if (typeof statusCode === 'number' && typeof errorMessage === 'string') {
        if (statusCode === 404) {
          const cartCreated = await createCart(true);
          const cart = await addProduct(cartCreated.id, cartCreated.version, id, true, quantity);
          return cart;
        }

        handleErrors(statusCode, errorMessage);
      }
    }
  }

  return Promise.resolve(null);
};
