import axios from 'axios';
import { createAdminJSONHeaders } from './headers';
import { IAllProductData, IProductData } from '@/types/apiInterfaces';

export const getProducts = async (url: string): Promise<IProductData[]> => {
  const headers = await createAdminJSONHeaders();
  const {
    data: { results },
  }: { data: IAllProductData } = await axios.get(url, {
    headers,
  });
  return results;
};

export const getCategories = async (url: string): Promise<unknown> => {
  const headers = await createAdminJSONHeaders();
  const res = await axios.get(url, {
    headers,
  });

  return res;
};
