import { createContext, ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { api } from '../services/api';
import {
  setAuthorizationToken,
  setUserStorage,
  signOut,
  verifyLoggedIn,
} from '../shared/functions/connection/auth';
import { IUser } from '../shared/interfaces/UserInterface';

interface SignInProps {
  email: string;
  password: string;
}

type AuthContextData = {
  signed: boolean;
  signIn({ email, password }: SignInProps): Promise<void>;
  signOut(): void;
  loading: boolean;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!verifyLoggedIn()) {
      setUser(null);
      setLoading(false);
      signOut();
    } else {
      setUser(JSON.parse(localStorage.getItem('@mini-erp:user') || ''));

      setLoading(false);
    }
  }, []);

  const signIn = async ({ email, password }: SignInProps) => {
    const response = await api.post('/auth/signin', {
      email: email,
      password: password,
    });

    if (response.status === 401) {
      toast.error('Usuário ou senha inválidos2');
    } else {
      setAuthorizationToken(`Bearer ${response.data.access_token}`);
      setUserStorage(response.data.user);
      setUser(response.data.user);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        signIn,
        signOut,
        loading,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
