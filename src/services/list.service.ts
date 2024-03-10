import { IList, TListRequest } from '@/types/list.types';

import { axiosWithAuth } from '@/api/interceptors';

class ListService {
  private BASE_URL = '/list';

  async createList(newListData: TListRequest) {
    const { data } = await axiosWithAuth.post<IList>(
      this.BASE_URL,
      newListData,
    );

    return data;
  }

  async updateList(newData: TListRequest) {
    const { data } = await axiosWithAuth.patch<IList>(this.BASE_URL, newData);

    return data;
  }

  async getAvailableLists() {
    const { data } = await axiosWithAuth.get<IList>(
      `${this.BASE_URL}/available`,
    );

    return data;
  }

  async getCreatedLists() {
    const { data } = await axiosWithAuth.get<IList>(`${this.BASE_URL}/created`);

    return data;
  }

  async deleteList(listId: string) {
    const { data } = await axiosWithAuth.delete<boolean>(
      `${this.BASE_URL}/${listId}`,
    );

    return data;
  }
}

export const listService = new ListService();
