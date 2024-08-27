import { Menu as ManuAntd, MenuProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    AppstoreOutlined, HomeOutlined, ShoppingOutlined, TagOutlined, UserOutlined
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

export const Nav = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Principal',
      icon: <HomeOutlined />,
    },
    {
      key: 'products',
      label: 'Produtos',
      icon: <ShoppingOutlined />,
      children: [
        {
          key: 'products_view',
          label: 'Visualizar',
          onClick: () => navigate('/products'),
        },
        {
          key: 'products_insert',
          label: 'Inserir',
          onClick: () => navigate('/products/insert'),
        },
      ],
    },
    {
      key: 'categories',
      label: 'Categorias',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: 'categories_view',
          label: 'Visualizar',
          onClick: () => navigate('/categories'),
        },
        {
          key: 'categories_insert',
          label: 'Inserir',
          onClick: () => navigate('/category/insert'),
        },
      ],
    },
    {
      key: 'order',
      label: 'Pedidos',
      icon: <TagOutlined />,
      onClick: () => navigate('/order'),
    },
    {
      key: 'user',
      label: 'Clientes',
      icon: <UserOutlined />,
      onClick: () => navigate('/user'),
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <div
      className='h-screen'
      style={{
        width: '240px',
        backgroundColor: '#001529',
      }}
    >
      <div
        className='w-full flex justify-center'
        style={{
          height: '72px',
          display: 'flex',
          alignItems: 'center',

          WebkitBoxShadow: '-2px 6px 4px 0px rgba(0, 0, 0, 0.47)',
          MozBoxShadow: '-2px 6px 4px 0px rgba(0, 0, 0, 0.47)',
          boxShadow: '-2px 6px 4px 0px rgba(0, 0, 0, 0.47)',
        }}
      >
        <h1 className='text-white font-bold'>Vendas Online</h1>
      </div>
      <ManuAntd
        theme='dark'
        onClick={onClick}
        style={{ width: 240 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode='inline'
        items={items}
      />
    </div>
  );
};
