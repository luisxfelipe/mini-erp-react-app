import { RouteObject } from 'react-router-dom';

import { Product } from './product/screens/product.form';
import { Products } from './product/screens/products.list';

export enum ProductRoutesEnum {
  PRODUCTS = '/products',
  PRODUCT_INSERT = '/products/insert',
  PRODUCT_EDIT = '/products/:productId',
}

export const productRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Products />,
  },
  {
    path: ProductRoutesEnum.PRODUCTS,
    element: <Products />,
  },
  {
    path: ProductRoutesEnum.PRODUCT_INSERT,
    element: <Product />,
  },
  {
    path: ProductRoutesEnum.PRODUCT_EDIT,
    element: <Product />,
  },
];
