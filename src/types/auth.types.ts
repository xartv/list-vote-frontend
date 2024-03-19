import { AUTH_ERROR_MESSAGES } from '@/constants/auth.constants';

import { IUser } from './user.types';

export interface IAuthForm {
  email: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export type TAuthErrorResponse = {
  message: AUTH_ERROR_MESSAGES;
};
