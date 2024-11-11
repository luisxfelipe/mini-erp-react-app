import { RouteObject } from 'react-router-dom';

import { PurchaseOrderDetails } from './screens/PurchaseOrderDetails';
import { PurchaseOrderList } from './screens/PurchaseOrderList';

export enum PurchaseOrderRoutesEnum {
  PURCHASE_ORDERS = '/purchase-orders',
  PURCHASE_ORDER_INSERT = '/purchase-orders/insert',
  PURCHASE_ORDER_EDIT = '/purchase-orders/:purchaseOrderId',
}

export const purchaseOrderRoutes: RouteObject[] = [
  {
    path: PurchaseOrderRoutesEnum.PURCHASE_ORDERS,
    element: <PurchaseOrderList />,
  },
  {
    path: PurchaseOrderRoutesEnum.PURCHASE_ORDER_INSERT,
    element: <PurchaseOrderDetails />,
  },
  {
    path: PurchaseOrderRoutesEnum.PURCHASE_ORDER_EDIT,
    element: <PurchaseOrderDetails />,
  },
];
