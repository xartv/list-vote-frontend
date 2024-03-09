import { IAuthForm, IAuthResponse } from '@/types/auth.types';

import { axiosBase } from '@/api/interceptors';

import {
  removeFromStorage,
  saveAccessTokenStorage,
} from './auth-token.service';

class AuthService {
  private BASE_URL = '/auth';

  async main(type: 'login' | 'register', data: IAuthForm) {
    const response = await axiosBase.post<IAuthResponse>(
      `${this.BASE_URL}/${type}`,
      data,
    );

    if (response.data.accessToken)
      saveAccessTokenStorage(response.data.accessToken);
    return response;
  }

  async getNewTokens() {
    const response = await axiosBase.post<IAuthResponse>(
      `${this.BASE_URL}/login/access-token`,
    );

    if (response.data.accessToken)
      saveAccessTokenStorage(response.data.accessToken);

    return response;
  }

  async logout() {
    const response = await axiosBase.post<boolean>(`${this.BASE_URL}/logout`);

    if (response.data) removeFromStorage();

    return response;
  }
}

export const authService = new AuthService();
