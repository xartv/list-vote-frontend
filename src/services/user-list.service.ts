import { TUserListRequest } from '@/types/user-list.types';

import { axiosWithAuth } from '@/api/interceptors';

class UserListService {
  private BASE_URL = '/user-list';

  async assignList(assignParams: TUserListRequest) {
    const { data } = await axiosWithAuth.post<boolean>(
      this.BASE_URL,
      assignParams,
    );

    return data;
  }

  async deleteAssignment(assignParams: TUserListRequest) {
    const { data } = await axiosWithAuth.delete<boolean>(this.BASE_URL, {
      data: assignParams,
    });

    return data;
  }
}

export const userListService = new UserListService();
