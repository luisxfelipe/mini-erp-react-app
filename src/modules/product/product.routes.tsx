import { RouteObject } from 'react-router-dom';

import { ProductDetails } from './screens/ProductDetails';
import { ProductList } from './screens/ProductList';

export enum ProductRoutesEnum {
  PRODUCTS = '/products',
  PRODUCT_INSERT = '/products/insert',
  PRODUCT_EDIT = '/products/:productId',
}

export const productRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProductList />,
  },
  {
    path: ProductRoutesEnum.PRODUCTS,
    element: <ProductList />,
  },
  {
    path: ProductRoutesEnum.PRODUCT_INSERT,
    element: <ProductDetails />,
  },
  {
    path: ProductRoutesEnum.PRODUCT_EDIT,
    element: <ProductDetails />,
  },
];
