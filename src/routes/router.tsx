import '@/pages/App.scss';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { loader } from '@/components/AuthForm/AuthForm';
import { catalogLoader } from '@/pages/Catalog/Catalog';
import PrivateRoute from './PrivateRoute';
import {
  MainPage,
  NotFoundPage,
  CartPage,
  CatalogPage,
  UserProfilePage,
  AboutUsPage,
  LoginPage,
  RegistrationPage,
} from './lazyPages';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <PrivateRoute>{<LoginPage />}</PrivateRoute>,
    loader,
  },
  {
    path: '/registration',
    element: <PrivateRoute>{<RegistrationPage />}</PrivateRoute>,
    loader,
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
        loader: catalogLoader,
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
