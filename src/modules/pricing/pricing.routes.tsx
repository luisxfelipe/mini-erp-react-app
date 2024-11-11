import { RouteObject } from 'react-router-dom';

import { PricingDetails } from './screens/PricingDetails';
import { PricingList } from './screens/PricingList';

export enum PricingRoutesEnum {
  PRICING = '/pricing',
  PRICING_INSERT = '/pricing/insert',
}

export const pricingRoutes: RouteObject[] = [
  {
    path: PricingRoutesEnum.PRICING,
    element: <PricingList />,
  },
  {
    path: PricingRoutesEnum.PRICING_INSERT,
    element: <PricingDetails />,
  },
];
