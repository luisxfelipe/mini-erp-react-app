import { RouteObject } from 'react-router-dom';

import { Login } from './screens/login';

export enum LoginRoutesEnum {
  LOGIN = '/login',
}

export const loginRoutes: RouteObject[] = [
  {
    path: LoginRoutesEnum.LOGIN,
    element: <Login />,
  },
];
