import Cookies from 'js-cookie';

import { ETokens } from '@/constants/auth.constants';

const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN ?? 'localhost';

export const getAccessToken = () => {
  const accessToken = Cookies.get(ETokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const saveAccessTokenStorage = (accessToken: string) => {
  Cookies.set(ETokens.ACCESS_TOKEN, accessToken, {
    domain: COOKIE_DOMAIN,
    sameSite: 'lax',
    expires: 1,
  });
};

export const removeFromStorage = () => {
  console.log(Cookies.get(ETokens.ACCESS_TOKEN));

  Cookies.remove(ETokens.ACCESS_TOKEN);
};
