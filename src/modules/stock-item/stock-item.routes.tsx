import { RouteObject } from 'react-router-dom';

import { StockItemReview } from './screens/StockItemReview';

export enum StockItemRoutesEnum {
  STOCK_ITEM_INSERT = '/stock-items/insert',
}

export const stockItemRoutes: RouteObject[] = [
  {
    path: StockItemRoutesEnum.STOCK_ITEM_INSERT,
    element: <StockItemReview purchaseOrderItems={[]} />,
  },
];
