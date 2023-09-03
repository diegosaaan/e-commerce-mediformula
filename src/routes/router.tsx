import '@/pages/App.scss';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { loader } from '@/components/AuthForm/AuthForm';
import { MainPageLoader } from '@/pages/Main/Main';
import { ProductPageLoader } from '@/pages/ProductPage/ProductPage';
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
        loader: MainPageLoader,
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
        path: '/catalog/:id',
        element: <DetailedProductPage />,
        loader: ProductPageLoader,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
