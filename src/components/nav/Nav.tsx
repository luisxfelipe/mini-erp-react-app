import { Menu as ManuAntd, MenuProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    AppstoreOutlined, HomeOutlined, ShoppingOutlined, TagOutlined, UserOutlined
} from '@ant-design/icons';

import { CategoryRoutesEnum } from '../../modules/category/category.routes';
import { ProductRoutesEnum } from '../../modules/product/product.routes';
import {
    PurchaseOrderItemStatusRoutesEnum
} from '../../modules/purchase-order/purchase-order-item/purchase-order-item-status/purchase-order-item-status.routes';
import {
    PurchaseOrderStatusRoutesEnum
} from '../../modules/purchase-order/purchase-order-status/purchase-order-status.routes';
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
      label: 'Compras',
      icon: <TagOutlined />,
      children: [
        {
          key: 'purchase-orders_view',
          label: 'Visualizar',
          onClick: () => navigate(PurchaseOrderRoutesEnum.PURCHASE_ORDERS),
        },
        {
          key: 'purchase-order-status',
          label: 'Status de compra',
          onClick: () =>
            navigate(PurchaseOrderStatusRoutesEnum.PURCHASE_ORDER_STATUS),
        },
        {
          key: 'purchase-order-item-status',
          label: 'Status de itens de compras',
          onClick: () =>
            navigate(
              PurchaseOrderItemStatusRoutesEnum.PURCHASE_ORDER_ITEM_STATUS,
            ),
        },
      ],
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
