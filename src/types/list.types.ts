import { IBase } from './base.types';
import { IListItem } from './list-item.types';
import { IUser } from './user.types';

export interface IList extends IBase {
  title: string;

  author?: Pick<IUser, 'email' | 'name'>[];
  accessUsers: {
    user: Pick<IUser, 'id' | 'email' | 'name'>;
  }[];
  items: IListItem[];
}

export type TListRequest = Partial<Pick<IList, 'title'>>;
