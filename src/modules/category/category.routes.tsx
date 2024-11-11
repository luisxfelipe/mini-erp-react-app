import { RouteObject } from 'react-router-dom';

import { CategoryDetails } from './screens/CategoryDetails';
import { CategoryList } from './screens/CategoryList';

export enum CategoryRoutesEnum {
  CATEGORIES = '/categories',
  CATEGORY_INSERT = '/categories/insert',
  CATEGORY_EDIT = '/categories/:categoryId',
}

export const categoryRoutes: RouteObject[] = [
  {
    path: CategoryRoutesEnum.CATEGORIES,
    element: <CategoryList />,
  },
  {
    path: CategoryRoutesEnum.CATEGORY_INSERT,
    element: <CategoryDetails />,
  },
  {
    path: CategoryRoutesEnum.CATEGORY_EDIT,
    element: <CategoryDetails />,
  },
];
