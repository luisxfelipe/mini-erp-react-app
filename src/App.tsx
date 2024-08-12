import { createBrowserRouter } from 'react-router-dom';

import { Screen } from './components/screen/Screen';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Product } from './pages/product/product';

const router = createBrowserRouter([
  {
    element: <Screen />,
    children: [
      {
        path: '',
        element: <Product />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export { router };
