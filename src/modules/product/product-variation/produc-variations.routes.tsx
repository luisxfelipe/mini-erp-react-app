import { RouteObject } from 'react-router-dom';

import { ProductVariationDetails } from './screens/ProductVariationDetails';

export enum ProductVariationRoutesEnum {
  PRODUCT_VARIATION_INSERT = '/product/:productId/variation/insert',
  PRODUCT_VARIATION_EDIT = '/product/:productId/variation/:productVariationId',
}

export const productVariationRoutes: RouteObject[] = [
  {
    path: ProductVariationRoutesEnum.PRODUCT_VARIATION_INSERT,
    element: <ProductVariationDetails />,
  },
  {
    path: ProductVariationRoutesEnum.PRODUCT_VARIATION_EDIT,
    element: <ProductVariationDetails />,
  },
];
