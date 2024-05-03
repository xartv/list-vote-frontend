import { IBase } from './base.types';

export interface IListItem extends IBase {
  title: string;
  rating: ERating;

  authorId: string;
  listId: string;
}

export type TListItemRequest = Partial<Pick<IListItem, 'title' | 'listId'>>;

export enum ERating {
  NULL = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}
