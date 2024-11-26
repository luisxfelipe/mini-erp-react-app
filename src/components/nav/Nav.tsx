import {
  AppstoreOutlined,
  HomeOutlined,
  ShoppingOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { Menu as ManuAntd, MenuProps } from 'antd';
import Layout from 'antd/es/layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CategoryRoutesEnum } from '../../modules/category/category.routes';
import { IntegrationProductSupplierErpRoutesEnum } from '../../modules/integration-product-supplier-erp/integration-product-supplier-erp.routes';
import { IntegrationStatusRoutesEnum } from '../../modules/integration-product-supplier-erp/integration-status/integration-status.routes';
import { PlatformRoutesEnum } from '../../modules/platform/platform.routes';
import { PricingRoutesEnum } from '../../modules/pricing/pricing.routes';
import { SalePlatformCommissionRoutesEnum } from '../../modules/pricing/sale-platform-commission/sale-platform-commission.routes';
import { ProductRoutesEnum } from '../../modules/product/product.routes';
import { PurchaseOrderItemStatusRoutesEnum } from '../../modules/purchase-order/purchase-order-item/purchase-order-item-status/purchase-order-item-status.routes';
import { PurchaseOrderStatusRoutesEnum } from '../../modules/purchase-order/purchase-order-status/purchase-order-status.routes';
import { PurchaseOrderRoutesEnum } from '../../modules/purchase-order/purchase-orders.routes';
import { SaleOrderItemStatusRoutesEnum } from '../../modules/sale-order/sale-order-item/sale-order-item-status/sale-order-item-status.routes';
import { SaleOrderRoutesEnum } from '../../modules/sale-order/sale-orders.routes';
import { SaleStatusRoutesEnum } from '../../modules/sale-order/sale-status/sale-status.routes';
import { StockItemIdentifierTypeRoutesEnum } from '../../modules/stock-item/stock-item-identifier-type/stock-item-identifier-type.routes';
import { StockItemStatusRoutesEnum } from '../../modules/stock-item/stock-item-status/stock-item-status.routes';
import { SupplierRoutesEnum } from '../../modules/supplier/supplier.routes';

type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout;

export const Nav = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Principal',
      icon: <HomeOutlined />,
    },
    {
      key: 'suppliers',
      label: 'Fornecedores',
      icon: <ShoppingOutlined />,
      onClick: () => navigate(SupplierRoutesEnum.SUPPLIERS),
    },
    {
      key: 'platforms',
      label: 'Plataformas',
      icon: <AppstoreOutlined />,
      onClick: () => navigate(PlatformRoutesEnum.PLATFORMS),
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
          key: 'categories',
          label: 'Categorias',
          onClick: () => navigate(CategoryRoutesEnum.CATEGORIES),
        },
      ],
    },
    {
      key: 'stock',
      label: 'Estoque',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: 'stock_item_identifier_types',
          label: 'Tipos de identificadores',
          onClick: () =>
            navigate(
              StockItemIdentifierTypeRoutesEnum.STOCK_ITEM_IDENTIFIER_TYPES,
            ),
        },
        {
          key: 'stock_item_status',
          label: 'Status de itens de estoque',
          onClick: () => navigate(StockItemStatusRoutesEnum.STOCK_ITEM_STATUS),
        },
      ],
    },
    {
      key: 'integrations',
      label: 'Integrações',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: 'integration_product_supplier_erp',
          label: 'Integração',
          onClick: () =>
            navigate(
              IntegrationProductSupplierErpRoutesEnum.INTEGRATION_PRODUCT_SUPPLIER_ERP,
            ),
        },
        {
          key: 'integration_status',
          label: 'Status de integração',
          onClick: () =>
            navigate(IntegrationStatusRoutesEnum.INTEGRATION_STATUS),
        },
      ],
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
      key: 'sales',
      label: 'Vendas',
      icon: <TagOutlined />,
      children: [
        {
          key: 'sales_view',
          label: 'Visualizar',
          onClick: () => navigate(SaleOrderRoutesEnum.SALE_ORDERS),
        },
        {
          key: 'sale-status',
          label: 'Status de venda',
          onClick: () => navigate(SaleStatusRoutesEnum.SALE_STATUS),
        },
        {
          key: 'sale-order-item-status',
          label: 'Status de itens de venda',
          onClick: () =>
            navigate(SaleOrderItemStatusRoutesEnum.SALE_ORDER_ITEM_STATUS),
        },
      ],
    },
    {
      key: 'pricing-and-commission',
      label: 'Precificação',
      icon: <TagOutlined />,
      children: [
        {
          key: 'sale-platform-commissions',
          label: 'Comissões de plataformas',
          onClick: () =>
            navigate(
              SalePlatformCommissionRoutesEnum.SALE_PLATFORM_COMMISSIONS,
            ),
        },
        {
          key: 'pricing',
          label: 'Precificação',
          onClick: () => navigate(PricingRoutesEnum.PRICING),
        },
      ],
    },
  ];

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{ width: '20vw' }}
    >
      <div className='demo-logo-vertical' />
      {!collapsed && (
        <div
          className='w-full flex justify-center'
          style={{
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '5px',
            WebkitBoxShadow: '-2px 6px 4px 0px rgba(0, 0, 0, 0.47)',
            MozBoxShadow: '-2px 6px 4px 0px rgba(0, 0, 0, 0.47)',
            boxShadow: '-2px 6px 4px 0px rgba(0, 0, 0, 0.47)',
          }}
        >
          <h1 className='text-white font-bold'>Vendas Online</h1>
        </div>
      )}

      <ManuAntd
        theme='dark'
        defaultSelectedKeys={['1']}
        mode='inline'
        items={items}
      />
    </Sider>
  );
};
