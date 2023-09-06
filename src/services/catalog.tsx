import axios from 'axios';
import { createAdminJSONHeaders } from './headers';
import { IAllProductData, IProductData } from '@/types/apiInterfaces';

export const getProducts = async (url: string): Promise<IAllProductData> => {
  const headers = await createAdminJSONHeaders();
  const { data }: { data: IAllProductData } = await axios.get(url, {
    headers,
  });

  return data;
};

export const getProductById = async (url: string): Promise<IProductData> => {
  const headers = await createAdminJSONHeaders();
  const { data }: { data: IProductData } = await axios.get(url, {
    headers,
  });

  return data;
};

export const getCategories = async (url: string): Promise<unknown> => {
  const headers = await createAdminJSONHeaders();
  const response = await axios.get(url, {
    headers,
  });

  return response;
};
