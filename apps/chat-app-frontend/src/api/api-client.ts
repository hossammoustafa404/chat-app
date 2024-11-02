import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { getSession } from 'next-auth/react';

interface MakeRequestOptions {
  endpoint: string;
  method?: Method;
  isPrivate?: boolean;
  body?: any;
  config?: AxiosRequestConfig;
}

export const makeRequest = <T>(
  options: MakeRequestOptions
): Promise<AxiosResponse<T>> => {
  const { isPrivate = true, method, endpoint, body, config } = options;

  let apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  if (isPrivate) {
    apiClient.interceptors.request.use(
      async (req) => {
        const { accessToken } = (await getSession()) as any;
        req.headers.Authorization = `Bearer ${accessToken}`;
        return req;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  switch (method) {
    case 'post':
    case 'POST':
      return apiClient.post(endpoint, body, config);

    case 'get':
    case 'GET':
      return apiClient.get(endpoint, config);

    case 'put':
    case 'PUT':
      return apiClient.put(endpoint, body, config);

    case 'patch':
    case 'PATCH':
      return apiClient.patch(endpoint, body, config);

    case 'delete':
    case 'DELETE':
      return apiClient.delete(endpoint, config);

    default:
      return apiClient.get(endpoint, config);
  }
};
