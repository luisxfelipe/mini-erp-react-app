import { RouteObject } from 'react-router-dom';

import { SaleOrderItemStatusList } from './screens/SaleOrderItemStatusList';

export enum SaleOrderItemStatusRoutesEnum {
  SALE_ORDER_ITEM_STATUS = '/sale-order-item-status',
}

export const saleOrderItemStatusRoutes: RouteObject[] = [
  {
    path: SaleOrderItemStatusRoutesEnum.SALE_ORDER_ITEM_STATUS,
    element: <SaleOrderItemStatusList />,
  },
];
