import { RouteObject } from 'react-router-dom';

import { Categories } from './screens/categories.list';
import { Category } from './screens/category.form';

export enum CategoryRoutesEnum {
  CATEGORIES = '/categories',
  CATEGORY_INSERT = '/categories/insert',
  CATEGORY_EDIT = '/categories/:categoryId',
}

export const categoryRoutes: RouteObject[] = [
  {
    path: CategoryRoutesEnum.CATEGORIES,
    element: <Categories />,
  },
  {
    path: CategoryRoutesEnum.CATEGORY_INSERT,
    element: <Category />,
  },
  {
    path: CategoryRoutesEnum.CATEGORY_EDIT,
    element: <Category />,
  },
];
