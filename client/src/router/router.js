import { createBrowserRouter } from 'react-router-dom';
import { TopLayout } from '../components/Layout/topLayout';
import { CreateAccount } from '../page/createAccount/createAccount';
import { Login } from '../page/login/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <TopLayout />,
    children: [
      {
        path: '/',
        element: '',
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/create_account',
    element: <CreateAccount />,
  },
]);
