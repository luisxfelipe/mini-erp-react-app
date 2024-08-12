import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './components/layout/Layout';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export { router };
