import { RouteObject } from 'react-router-dom';

import { StockItemIdentifierTypeDetails } from './screens/StockItemIdentifierTypeDetails';
import { StockItemIdentifierTypeList } from './screens/StockItemIdentifierTypeList';

export enum StockItemIdentifierTypeRoutesEnum {
  STOCK_ITEM_IDENTIFIER_TYPES = '/stock-item-identifier-types',
  STOCK_ITEM_IDENTIFIER_TYPE_INSERT = '/stock-item-identifier-types/insert',
}

export const stockItemIdentifierTypeRoutes: RouteObject[] = [
  {
    path: StockItemIdentifierTypeRoutesEnum.STOCK_ITEM_IDENTIFIER_TYPES,
    element: <StockItemIdentifierTypeList />,
  },
  {
    path: StockItemIdentifierTypeRoutesEnum.STOCK_ITEM_IDENTIFIER_TYPE_INSERT,
    element: <StockItemIdentifierTypeDetails />,
  },
];
