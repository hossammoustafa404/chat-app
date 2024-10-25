import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const privateApiClient = axios.create({
  baseURL,
});

const publicApiClient = axios.create({
  baseURL,
});

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

  const apiClient = isPrivate ? privateApiClient : publicApiClient;

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
