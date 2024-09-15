import {
  AppstoreOutlined,
  HomeOutlined,
  ShoppingOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu as ManuAntd, MenuProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CategoryRoutesEnum } from '../../modules/category/category.routes';
import { ProductRoutesEnum } from '../../modules/product/product.routes';
import { PurchaseOrderRoutesEnum } from '../../modules/purchase-order/purchase-orders.routes';
import { SupplierRoutesEnum } from '../../modules/supplier/supplier.routes';

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
          onClick: () => navigate(ProductRoutesEnum.PRODUCTS),
        },
        {
          key: 'product_insert',
          label: 'Inserir',
          onClick: () => navigate(ProductRoutesEnum.PRODUCT_INSERT),
        },
      ],
    },
    {
      key: 'categories',
      label: 'Categorias',
      icon: <AppstoreOutlined />,

      onClick: () => navigate(CategoryRoutesEnum.CATEGORIES),
    },
    {
      key: 'suppliers',
      label: 'Fornecedores',
      icon: <ShoppingOutlined />,
      onClick: () => navigate(SupplierRoutesEnum.SUPPLIERS),
    },
    {
      key: 'purchase-orders',
      label: 'Pedidos de compra',
      icon: <TagOutlined />,
      onClick: () => navigate(PurchaseOrderRoutesEnum.PURCHASE_ORDERS),
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
