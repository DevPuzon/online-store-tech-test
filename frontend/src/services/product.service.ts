import { createAxiosInstance } from '../core/utils/api.util';

const api = createAxiosInstance();

export const getProducts = async () => {
   const response = await api.get('/products');
   return response.data.data;
};
