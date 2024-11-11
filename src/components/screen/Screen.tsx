import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../../contexts/authContext';
import { Container } from '../container/Container';
import { Header } from '../header/Header';
import { Nav } from '../nav/Nav';

export const Screen = () => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <></>;
  }

  if (!signed) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <div className='w-full flex flex-row'>
        <Nav />

        <Container>
          <Header />
          <div className='p-4'>
            <Outlet />
          </div>
        </Container>
      </div>
    </>
  );
};
