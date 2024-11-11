import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const SaleOrderItemList = lazy(() =>
  import('./screens/SaleOrderItemList').then((module) => ({
    default: module.SaleOrderItemList,
  })),
);
const SaleOrderItemDetails = lazy(() =>
  import('./screens/SaleOrderItemDetails').then((module) => ({
    default: module.SaleOrderItemDetails,
  })),
);

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
