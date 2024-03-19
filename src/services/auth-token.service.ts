import Cookies from 'js-cookie';

import { ETokens } from '@/constants/auth.constants';

const BASE_URL = process.env.BASE_URL ?? 'localhost';

export const getAccessToken = () => {
  const accessToken = Cookies.get(ETokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const saveAccessTokenStorage = (accessToken: string) => {
  Cookies.set(ETokens.ACCESS_TOKEN, accessToken, {
    domain: BASE_URL,
    sameSite: 'strict',
    expires: 1,
  });
};

export const removeFromStorage = () => {
  Cookies.remove(ETokens.ACCESS_TOKEN);
};
