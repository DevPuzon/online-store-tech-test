import axios, { AxiosInstance, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { storageClear, storageGetItem } from './storage.util';

interface LoaderHook {
   showLoader: () => void;
   hideLoader: () => void;
}

type LoaderState = ((state: boolean) => void) | LoaderHook | null;

interface ApiRequestParams {
   endpoint: string;
   method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
   body?: Record<string, any>;
   params?: Record<string, any>;
   setData?: ((data: any) => void) | null;
   setLoader?: LoaderState;
   responseType?: 'json' | 'blob';
   downloadFilename?: string;
}

interface ApiError {
   response?: {
      data?: {
         errors?: string[];
         message?: string;
      };
   };
}

export const createAxiosInstance = (): AxiosInstance => {
   const headers = {
      'Content-Type': 'application/json',
   };
   const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: headers,
   });

   instance.interceptors.request.use(
      (config) => {
         return config;
      },
      (error) => {
         return Promise.reject(error);
      }
   );

   instance.interceptors.response.use(
      (response) => {
         return response;
      },
      (error) => {
         return Promise.reject(error);
      }
   );

   return instance;
};

export const apiRequest = async ({
   endpoint,
   method = 'POST',
   body = {},
   params = {},
   setData = null,
   setLoader = null,
   responseType = 'json',
   downloadFilename = '',
}: ApiRequestParams): Promise<any> => {
   const axiosInstance = createAxiosInstance();

   const isFunctionBasedLoader = setLoader && 'showLoader' in setLoader;

   if (setLoader) {
      if (isFunctionBasedLoader) {
         (setLoader as LoaderHook).showLoader();
      } else if (typeof setLoader === 'function') {
         (setLoader as (state: boolean) => void)(true);
      }
   }

   if (body === null) {
      body = {};
   }

   try {
      let response: AxiosResponse;

      if (method === 'GET') {
         response = await axiosInstance.get(`/v2/${endpoint}`, { params });
      } else if (method === 'POST') {
         response = await axiosInstance.post(`/v2/${endpoint}`, body);
      } else if (method === 'PUT') {
         response = await axiosInstance.put(`/v2/${endpoint}`, body);
      } else if (method === 'DELETE') {
         response = await axiosInstance.delete(`/v2/${endpoint}`, { data: body });
      } else {
         throw new Error(`Unsupported HTTP method: ${method}`);
      }

      if (responseType === 'blob') {
         const contentDisposition = response.headers['content-disposition'];
         console.log('contentDisposition', contentDisposition, downloadFilename, body);
         const filename = contentDisposition
            ? contentDisposition.split('filename=')[1]
            : downloadFilename;

         const url = window.URL.createObjectURL(new Blob([response.data]));
         const a = document.createElement('a');
         a.href = url;
         a.download = filename;
         document.body.appendChild(a);
         a.click();
         window.URL.revokeObjectURL(url);
         document.body.removeChild(a);
      }

      if (setData && responseType === 'json' && typeof setData === 'function') {
         setData(response.data);
      }
      return response.data;
   } catch (error) {
      console.error(`Error in ${method} request to ${endpoint}:`, error);
      const apiError = error as ApiError;
      const errors = apiError.response?.data?.errors || null;
      if (errors) {
         for (const error of errors) {
            toast.error(error);
         }
      } else {
         toast.error(apiError.response?.data?.message || 'An error occurred');
      }
      throw error;
   } finally {
      if (setLoader) {
         if (isFunctionBasedLoader) {
            (setLoader as LoaderHook).hideLoader();
         } else if (typeof setLoader === 'function') {
            (setLoader as (state: boolean) => void)(false);
         }
      }
   }
};
