import { RouteObject } from 'react-router-dom';

import { SaleStatusList } from './screens/SaleStatusList';

export enum SaleStatusRoutesEnum {
  SALE_STATUS = '/sale-status',
}

export const saleStatusRoutes: RouteObject[] = [
  {
    path: SaleStatusRoutesEnum.SALE_STATUS,
    element: <SaleStatusList />,
  },
];
