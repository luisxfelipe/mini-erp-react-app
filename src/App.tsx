import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { Screen } from './components/screen/Screen';
import { categoryRoutes } from './modules/category/category.routes';
import { loginRoutes } from './modules/login/routes';
import { productVariationRoutes } from './modules/product/product-variation/produc-variations.routes';
import { productRoutes } from './modules/product/product.routes';
import { supplierRoutes } from './modules/supplier/supplier.routes';
import { verifyLoggedIn } from './shared/functions/connection/auth';

import type { Router as RemixRouter } from '@remix-run/router';
const routes: RouteObject[] = [...loginRoutes];
const routesLoggedIn: RouteObject[] = [
  ...categoryRoutes,
  ...productRoutes,
  ...productVariationRoutes,
  ...supplierRoutes,
].map((route) => ({
  ...route,
  loader: verifyLoggedIn,
}));

const router: RemixRouter = createBrowserRouter([
  {
    element: <Screen />,
    children: [...routesLoggedIn],
  },
  ...routes,
]);

export { router };
