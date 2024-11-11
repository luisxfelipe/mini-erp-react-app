import { RouteObject } from 'react-router-dom';

import { StockItemStatusDetails } from './screens/StockItemStatusDetails';
import { StockItemStatusList } from './screens/StockItemStatusList';

export enum StockItemStatusRoutesEnum {
  STOCK_ITEM_STATUS = '/stock-item-status',
  STOCK_ITEM_STATUS_INSERT = '/stock-item-status/insert',
}

export const stockItemStatusRoutes: RouteObject[] = [
  {
    path: StockItemStatusRoutesEnum.STOCK_ITEM_STATUS,
    element: <StockItemStatusList />,
  },
  {
    path: StockItemStatusRoutesEnum.STOCK_ITEM_STATUS_INSERT,
    element: <StockItemStatusDetails />,
  },
];
