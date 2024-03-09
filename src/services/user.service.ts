import { IUser, UserUpdateRequest } from '@/types/user.types';

import { axiosWithAuth } from '@/api/interceptors';

class UserService {
  private BASE_URL = '/user/profile';

  async getProfile() {
    const { data } = await axiosWithAuth<IUser>(this.BASE_URL);

    return data;
  }

  async updateProfile(newData: UserUpdateRequest) {
    const { data } = await axiosWithAuth.patch<IUser>(this.BASE_URL, newData);

    return data;
  }
}

export const userService = new UserService();
