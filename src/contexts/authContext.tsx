import { createContext, ReactNode, useEffect, useState } from 'react';

import { api } from '../services/api';

interface UserProps {
  id: string;
  name: string | null;
  email: string | null;
}

interface SignInProps {
  email: string;
  password: string;
}

type AuthContextData = {
  signed: boolean;
  signIn({ email, password }: SignInProps): Promise<void>;
  signOut(): void;
  verifyLoggedIn(): boolean;
  loading: boolean;
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!verifyLoggedIn()) {
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
      alert('Usuário ou senha inválidos');
    } else {
      api.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
      localStorage.setItem('@mini-erp:token', response.data.access_token);
      localStorage.setItem(
        '@mini-erp:user',
        JSON.stringify(response.data.user),
      );
      setUser(JSON.parse(localStorage.getItem('@mini-erp:user') || ''));
    }
    setLoading(false);
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    setLoading(false);
  };

  const verifyLoggedIn = (): boolean => {
    const token = localStorage.getItem('@mini-erp:token');
    const user = localStorage.getItem('@mini-erp:user');
    if (!token) {
      return false;
    }

    if (!user) {
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        signIn,
        signOut,
        verifyLoggedIn,
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
