import '@/pages/App.scss';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { productPageLoader } from '@/pages/ProductPage/ProductPage';
import { catalogLoader } from '@/pages/Catalog/Catalog';
import { cartLoader } from '@/pages/Cart/Cart';
import { PrivateRouteForLoginAndRegistration, PrivateRouteForAuthorizedUser } from './PrivateRoutes';
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
      <PrivateRouteForLoginAndRegistration>
        <LoginPage />
      </PrivateRouteForLoginAndRegistration>
    ),
  },
  {
    path: '/registration',
    element: (
      <PrivateRouteForLoginAndRegistration>
        <RegistrationPage />
      </PrivateRouteForLoginAndRegistration>
    ),
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
        loader: cartLoader,
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
