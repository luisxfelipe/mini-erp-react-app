import { RouteObject } from 'react-router-dom';

import { PurchaseOrderStatusList } from './screens/PurchaseOrderStatusList';

export enum PurchaseOrderStatusRoutesEnum {
  PURCHASE_ORDER_STATUS = '/purchase-order-status',
}

export const purchaseOrderStatusRoutes: RouteObject[] = [
  {
    path: PurchaseOrderStatusRoutesEnum.PURCHASE_ORDER_STATUS,
    element: <PurchaseOrderStatusList />,
  },
];
