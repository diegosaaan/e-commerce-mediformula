import '@/pages/App.scss';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { loader } from '@/components/AuthForm/AuthForm';
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
  DetailedProductPage,
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
      {
        path: '/product-page',
        element: <DetailedProductPage />,
      },
    ],
  },
]);

export default router;
