import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../../contexts/authContext';
import { Header } from '../header/Header';

export const Layout = () => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
