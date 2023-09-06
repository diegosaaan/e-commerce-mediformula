import React, { ComponentType, ReactElement, Suspense, lazy } from 'react';
import CirclePreloader from '@/components/Preloaders/CirclePreloader/CirclePreloader';

// eslint-disable-next-line no-promise-executor-return
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const LazyComponent = (
  preloader: ReactElement,
  importFunction: () => Promise<{ default: ComponentType<unknown> }>
): (() => ReactElement) => {
  const Component = lazy(importFunction);

  return (): ReactElement => (
    <Suspense fallback={preloader}>
      <Component />
    </Suspense>
  );
};

export const LoginPage = LazyComponent(<CirclePreloader pageClassname="login" />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/login/login" */ '@/pages/Login/Login');
});

export const RegistrationPage = LazyComponent(<CirclePreloader pageClassname="registration" />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/registration/registration" */ '@/pages/Registration/Registration');
});

export const MainPage = LazyComponent(<CirclePreloader pageClassname="main" />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/main/main" */ '@/pages/Main/Main');
});

export const CatalogPage = LazyComponent(<CirclePreloader pageClassname="catalog" />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/catalog/catalog" */ '@/pages/Catalog/Catalog');
});

export const UserProfilePage = LazyComponent(<CirclePreloader pageClassname="user-profile" />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/user-profile/user-profile" */ '@/pages/UserProfile/UserProfile');
});

export const DetailedProductPage = LazyComponent(<CirclePreloader pageClassname="product-page" />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/product-page/product-page" */ '@/pages/ProductPage/ProductPage');
});

export const CartPage = LazyComponent(<CirclePreloader pageClassname="cart" />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/cart/cart" */ '@/pages/Cart/Cart');
});

export const AboutUsPage = LazyComponent(<CirclePreloader pageClassname="about-us" />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/about-us/about-us" */ '@/pages/AboutUs/AboutUs');
});

export const NotFoundPage = LazyComponent(<CirclePreloader pageClassname="not-found" />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/not-found/not-found" */ '@/pages/NotFound/NotFound');
});
