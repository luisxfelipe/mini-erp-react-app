import { RouteObject } from 'react-router-dom';

import { PlatformDetails } from './screens/PlatformDetails';
import { PlatformList } from './screens/PlatformList';

export enum PlatformRoutesEnum {
  PLATFORMS = '/platforms',
  PLATFORM_INSERT = '/platforms/insert',
}

export const platformRoutes: RouteObject[] = [
  {
    path: PlatformRoutesEnum.PLATFORMS,
    element: <PlatformList />,
  },
  {
    path: PlatformRoutesEnum.PLATFORM_INSERT,
    element: <PlatformDetails />,
  },
];
