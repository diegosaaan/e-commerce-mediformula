import '@/pages/App.scss';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { authPreloader } from '@/components/AuthForm/AuthForm';
import { MainPageLoader } from '@/pages/Main/Main';
import { ProductPageLoader } from '@/pages/ProductPage/ProductPage';
import { catalogLoader } from '@/pages/Catalog/Catalog';
import { PrivateLoginAndRegistrationRoute, PrivateRouteForAuthorizedUser } from './PrivateRoutes';
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
        loader: MainPageLoader,
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
        element: <PrivateRouteForAuthorizedUser>{<UserProfilePage />}</PrivateRouteForAuthorizedUser>,
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
