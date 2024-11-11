import { RouteObject } from 'react-router-dom';

import { SaleOrderItemDetails } from './screens/SaleOrderItemDetails';
import { SaleOrderItemList } from './screens/SaleOrderItemList';

export enum SaleOrderItemRoutesEnum {
  SALE_ORDER_ITEMS = '/sale-order-items',
  SALE_ORDER_ITEM_INSERT = '/sale-order-item/insert',
  SALE_ORDER_ITEM_EDIT = '/sale-order-item/:saleOrderItemId',
}
// ... (mantenha o enum como está)

export const saleOrderItemRoutes: RouteObject[] = [
  {
    path: SaleOrderItemRoutesEnum.SALE_ORDER_ITEMS,
    element: <SaleOrderItemList />,
  },
  {
    path: SaleOrderItemRoutesEnum.SALE_ORDER_ITEM_INSERT,
    element: <SaleOrderItemDetails />,
  },
  {
    path: SaleOrderItemRoutesEnum.SALE_ORDER_ITEM_EDIT,
    element: <SaleOrderItemDetails />,
  },
];
