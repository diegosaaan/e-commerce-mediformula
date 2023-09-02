import '@/pages/App.scss';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { authPreloader } from '@/components/AuthForm/AuthForm';
import { catalogLoader } from '@/pages/Catalog/Catalog';
import { PrivateLoginAndRegistrationRoute, PrivateRouteForAuthorizedUser } from './PrivateRoutes';
import ProductInfo from '@/components/ProductInfo/ProductInfo';
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
    element: (
      <PrivateLoginAndRegistrationRoute>
        <LoginPage />
      </PrivateLoginAndRegistrationRoute>
    ),
    loader: authPreloader,
  },
  {
    path: '/registration',
    element: (
      <PrivateLoginAndRegistrationRoute>
        <RegistrationPage />
      </PrivateLoginAndRegistrationRoute>
    ),
    loader: authPreloader,
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
        path: '/catalog/:idCard',
        element: <ProductInfo />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/user-profile',
        element: <PrivateRouteForAuthorizedUser>{<UserProfilePage />}</PrivateRouteForAuthorizedUser>,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
