import axios, { type AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { AuthStorage } from '../storage/auth.storage';
import { type AuthResponseDto } from './auth/dto/auth-response.dto';

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    config.headers.Authorization = `Bearer ${AuthStorage.getAccessToken()}`;
    return config;
  };

  const onRequestError = async (error: AxiosError): Promise<AxiosError> => await Promise.reject(error);

  const onResponse = (response: AxiosResponse): AxiosResponse => response;

  const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
    // @ts-expect-error get this field for checking if the request already retried
    if (error.response?.status === 401 && error.config != null && !error.config._isRetry) {
      // @ts-expect-error set this when retrying request
      error.config.__isRetry = true;
      try {
        const response = await axios.get<AuthResponseDto>(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
          headers: { Authorization: `Bearer ${AuthStorage.getRefreshToken()}` },
        });
        AuthStorage.storeAccessToken(response.data.accessToken);
        AuthStorage.storeRefreshToken(response.data.refreshToken);

        return await axiosInstance.request(error.config);
      } catch (e) {
        return await Promise.reject(error);
      }
    }
    return await Promise.reject(error);
  };

  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
