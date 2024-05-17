import axios, { CreateAxiosDefaults } from 'axios';

import { errorCatch } from './error';
import {
  getAccessToken,
  removeFromStorage,
} from '@/services/auth-token.service';
import { authService } from '@/services/auth.service';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'localhost';
const PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL ?? 'http';

const isDev = process.env.NEXT_PUBLIC_MODE === 'development';

const options: CreateAxiosDefaults = {
  baseURL: `${PROTOCOL}://${BASE_URL}${isDev ? ':3002' : ''}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const axiosBase = axios.create(options);

const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use(config => {
  const accessToken = getAccessToken();

  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosWithAuth.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;

    if (
      (error?.response?.status === 401 ||
        ['jwt expired', 'jwt must be provided'].includes(errorCatch(error))) &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await authService.getNewTokens();
        return axiosWithAuth.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') removeFromStorage();
      }
    }
  },
);

export { axiosBase, axiosWithAuth };
