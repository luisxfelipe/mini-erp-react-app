import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { Screen } from './components/screen/Screen';
import { loginRoutes } from './modules/login/routes';
import { productRoutes } from './modules/routes';
import { verifyLoggedIn } from './shared/functions/connection/auth';

import type { Router as RemixRouter } from '@remix-run/router';
const routes: RouteObject[] = [...loginRoutes];
const routesLoggedIn: RouteObject[] = [...productRoutes].map((route) => ({
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
