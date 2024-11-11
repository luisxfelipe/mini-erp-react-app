import { RouteObject } from 'react-router-dom';

import { SaleOrderDetails } from './screens/SaleOrderDetails';
import { SaleOrderList } from './screens/SaleOrderList';

export enum SaleOrderRoutesEnum {
  SALE_ORDERS = '/sale-orders',
  SALE_ORDER_INSERT = '/sale-orders/insert',
  SALE_ORDER_EDIT = '/sale-orders/:saleOrderId',
}

export const saleOrderRoutes: RouteObject[] = [
  {
    path: SaleOrderRoutesEnum.SALE_ORDERS,
    element: <SaleOrderList />,
  },
  {
    path: SaleOrderRoutesEnum.SALE_ORDER_INSERT,
    element: <SaleOrderDetails />,
  },
  {
    path: SaleOrderRoutesEnum.SALE_ORDER_EDIT,
    element: <SaleOrderDetails />,
  },
];
