import { redirect } from 'react-router-dom';

import { IUser } from '../../interfaces/UserInterface';

import { getItem, getItemParse, removeItem, setItem } from './storageProxy';

export const getAuthorizationToken = () => getItem('@mini-erp:token');

export const getUserStorage = () => getItemParse('@mini-erp:user');

export const setAuthorizationToken = (token: string) => {
  setItem('@mini-erp:token', token);
};

export const setUserStorage = (user: IUser) => {
  setItem('@mini-erp:user', JSON.stringify(user));
};

export const unsetAuthorizationToken = () => removeItem('@mini-erp:token');

export const unsetUserStorage = () => removeItem('@mini-erp:user');

export const verifyLoggedIn = () => {
  const token = getAuthorizationToken();
  const user = getUserStorage();
  if (!token || !user) {
    return false;
  }

  return true;
};

export const signOut = () => {
  unsetAuthorizationToken();
  unsetUserStorage();
  redirect('/login');
};
