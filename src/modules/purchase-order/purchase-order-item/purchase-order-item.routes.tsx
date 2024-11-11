import { RouteObject } from 'react-router-dom';

import { PurchaseOrderItemDetails } from './screens/PurchaseOrderItemDetails';
import { PurchaseOrderItemList } from './screens/PurchaseOrderItemList';

export enum PurchaseOrderItemRoutesEnum {
  PURCHASE_ORDER_ITEMS = '/purchase-order-items',
  PURCHASE_ORDER_ITEM_INSERT = '/purchase-order-item/insert',
  PURCHASE_ORDER_ITEM_EDIT = '/purchase-order-item/:purchaseOrderItemId',
}

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
