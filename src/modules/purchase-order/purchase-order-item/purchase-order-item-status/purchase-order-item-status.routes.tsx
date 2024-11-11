import { RouteObject } from 'react-router-dom';

import { PurchaseOrderItemStatusList } from './screens/PurchaseOrderItemStatusList';

export enum PurchaseOrderItemStatusRoutesEnum {
  PURCHASE_ORDER_ITEM_STATUS = '/purchase-order-item-status',
}

export const purchaseOrderItemStatusRoutes: RouteObject[] = [
  {
    path: PurchaseOrderItemStatusRoutesEnum.PURCHASE_ORDER_ITEM_STATUS,
    element: <PurchaseOrderItemStatusList />,
  },
];
