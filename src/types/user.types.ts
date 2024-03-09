import { IBase } from './base.types';

export interface IUser extends IBase {
  email: string;
  name?: string;
}

export type UserUpdateRequest = Pick<IUser, 'name'>;
