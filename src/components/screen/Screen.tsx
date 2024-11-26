import { Layout } from 'antd';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../../contexts/authContext';
import { Header } from '../header/Header';
import { Nav } from '../nav/Nav';

const { Content, Footer } = Layout;

export const Screen = () => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <></>;
  }

  if (!signed) {
    return <Navigate to='/login' />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Nav />
      <Layout>
        <Header />
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
