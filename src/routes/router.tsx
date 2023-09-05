import '@/pages/App.scss';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { authLoader } from '@/components/AuthForm/AuthForm';
import { mainPageLoader } from '@/pages/Main/Main';
import { productPageLoader } from '@/pages/ProductPage/ProductPage';
import { catalogLoader } from '@/pages/Catalog/Catalog';
import { PrivateLoginAndRegistrationRoute, PrivateRouteForAuthorizedUser } from './PrivateRoutes';
import {
  LoginPage,
  RegistrationPage,
  MainPage,
  CatalogPage,
  UserProfilePage,
  DetailedProductPage,
  CartPage,
  AboutUsPage,
  NotFoundPage,
} from './lazyPages';

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PrivateLoginAndRegistrationRoute>
        <LoginPage />
      </PrivateLoginAndRegistrationRoute>
    ),
    loader: authLoader,
  },
  {
    path: '/registration',
    element: (
      <PrivateLoginAndRegistrationRoute>
        <RegistrationPage />
      </PrivateLoginAndRegistrationRoute>
    ),
    loader: authLoader,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
        loader: mainPageLoader,
      },
      {
        path: '/catalog',
        element: <CatalogPage />,
        loader: catalogLoader,
      },
      {
        path: '/user-profile',
        element: <PrivateRouteForAuthorizedUser>{<UserProfilePage />}</PrivateRouteForAuthorizedUser>,
      },
      {
        path: '/catalog/:id',
        element: <DetailedProductPage />,
        loader: productPageLoader,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/about-us',
        element: <AboutUsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
