import '@/pages/App.scss';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import PrivateRoute from './PrivateRoute';
import { MainPage, NotFoundPage, CartPage, CatalogPage, UserProfilePage, AboutUsPage } from './lazyPages';

import LoginPage from '@/pages/Login/Login';
import RegistrationPage from '@/pages/Registration/Registration';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <PrivateRoute>{<LoginPage />}</PrivateRoute>,
  },
  {
    path: '/registration',
    element: <PrivateRoute>{<RegistrationPage />}</PrivateRoute>,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: '/about-us',
        element: <AboutUsPage />,
      },
      {
        path: '/catalog',
        element: <CatalogPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/user-profile',
        element: <UserProfilePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
