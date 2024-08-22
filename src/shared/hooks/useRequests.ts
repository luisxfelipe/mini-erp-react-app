import { useContext, useState } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { AuthContext } from '../../contexts/authContext';
import {
  ERROR_ACCESS_DENIED,
  ERROR_INVALID_LOGIN,
} from '../constants/errorsStatus';
import { URL_LOGIN } from '../constants/urls';
import { setAuthorizationToken, signOut } from '../functions/connection/auth';
import ConnectionAPI, {
  connectionAPIPost,
  MethodType,
} from '../functions/connection/connectionApi';
import { IAuth } from '../types/AuthType';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const request = async <T>(
    url: string,
    method: MethodType,
    body?: unknown,
    message?: string,
  ): Promise<T | undefined> => {
    setLoading(true);

    const result: T | undefined = await ConnectionAPI.connect<T>(
      url,
      method,
      body,
    )
      .then((response) => {
        if (message) {
          console.log(message);
        }
        return response;
      })
      .catch((error: Error) => {
        if (error.message === ERROR_ACCESS_DENIED) {
          signOut();
        }
        console.log(`Error: ${error.message}`);
        return undefined;
      });

    setLoading(false);

    return result;
  };

  const authRequest = async (
    navigate: NavigateFunction,
    body: unknown,
  ): Promise<void> => {
    setLoading(true);

    await connectionAPIPost<IAuth>(URL_LOGIN, body)
      .then((result) => {
        setUser(result.user);
        setAuthorizationToken(`Bearer ${result.access_token}`);
        navigate('/');
        return result;
      })
      .catch(() => {
        console.log(ERROR_INVALID_LOGIN);
        return undefined;
      });

    setLoading(false);
  };

  return {
    loading,
    authRequest,
    request,
  };
};
