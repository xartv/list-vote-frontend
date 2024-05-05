import { IBase } from './base.types';
import { ERating } from './list-item.types';

export interface IRatingMark extends IBase {
  value: ERating;
  authorId: string;
  listItemId: string;
}

export type TRatingMarkRequest = Pick<IRatingMark, 'value' | 'listItemId'>;
