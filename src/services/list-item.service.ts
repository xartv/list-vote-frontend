import { IListItem, TListItemRequest } from '@/types/list-item.types';

import { axiosWithAuth } from '@/api/interceptors';

class ListItemService {
  private BASE_URL = '/list-item';

  async createListItem(newListItemData: TListItemRequest) {
    const { data } = await axiosWithAuth.post<IListItem>(
      this.BASE_URL,
      newListItemData,
    );

    return data;
  }

  async updateListItem(newData: TListItemRequest) {
    const { data } = await axiosWithAuth.patch<IListItem>(this.BASE_URL, newData);

    return data;
  }

  async deleteListItem(listItemId: string) {
    const { data } = await axiosWithAuth.delete<boolean>(
      `${this.BASE_URL}/${listItemId}`,
    );

    return data;
  }
}

export const listItemService = new ListItemService();
