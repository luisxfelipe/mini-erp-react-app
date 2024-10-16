import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const PurchaseOrderItemList = lazy(() =>
  import('./screens/PurchaseOrderItemList').then((module) => ({
    default: module.PurchaseOrderItemList,
  })),
);
const PurchaseOrderItemDetails = lazy(() =>
  import('./screens/PurchaseOrderItemDetails').then((module) => ({
    default: module.PurchaseOrderItemDetails,
  })),
);

export enum PurchaseOrderItemRoutesEnum {
  PURCHASE_ORDER_ITEMS = '/purchase-order-items',
  PURCHASE_ORDER_ITEM_INSERT = '/purchase-order-item/insert',
  PURCHASE_ORDER_ITEM_EDIT = '/purchase-order-item/:purchaseOrderItemId',
}
// ... (mantenha o enum como está)

export const purchaseOrderItemRoutes: RouteObject[] = [
  {
    path: PurchaseOrderItemRoutesEnum.PURCHASE_ORDER_ITEMS,
    element: <PurchaseOrderItemList />,
  },
  {
    path: PurchaseOrderItemRoutesEnum.PURCHASE_ORDER_ITEM_INSERT,
    element: <PurchaseOrderItemDetails />,
  },
  {
    path: PurchaseOrderItemRoutesEnum.PURCHASE_ORDER_ITEM_EDIT,
    element: <PurchaseOrderItemDetails />,
  },
];
