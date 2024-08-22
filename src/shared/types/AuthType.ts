import { IUser } from './UserType';

export interface IAuth {
  access_token: string;
  user: IUser;
}
