import { IUser } from './UserInterface';

export interface IAuth {
  access_token: string;
  user: IUser;
}
