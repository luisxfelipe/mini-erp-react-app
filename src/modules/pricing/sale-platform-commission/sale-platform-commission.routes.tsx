import { RouteObject } from 'react-router-dom';

import { SalePlatformCommissionDetails } from './screens/SalePlatformCommissionDetails';
import { SalePlatformCommissionList } from './screens/SalePlatformCommissionList';

export enum SalePlatformCommissionRoutesEnum {
  SALE_PLATFORM_COMMISSIONS = '/sale-platform-commissions',
  SALE_PLATFORM_COMMISSION_INSERT = '/sale-platform-commissions/insert',
}

export const salePlatformCommissionRoutes: RouteObject[] = [
  {
    path: SalePlatformCommissionRoutesEnum.SALE_PLATFORM_COMMISSIONS,
    element: <SalePlatformCommissionList />,
  },
  {
    path: SalePlatformCommissionRoutesEnum.SALE_PLATFORM_COMMISSION_INSERT,
    element: <SalePlatformCommissionDetails />,
  },
];
