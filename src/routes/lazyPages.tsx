import React, { ComponentType, ReactElement, Suspense, lazy } from 'react';
import LoginPreloader from '@/utils/helpers/Loader/LoginPreloader/AuthPreloader';
import LayoutPreloader from '@/utils/helpers/Loader/LayoutPreloader/LayoutPreloader';

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

export const LoginPage = LazyComponent(<LoginPreloader />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/login/login" */ '@/pages/Login/Login');
});

export const RegistrationPage = LazyComponent(<LoginPreloader />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/registration/registration" */ '@/pages/Registration/Registration');
});

export const MainPage = LazyComponent(<LayoutPreloader />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/main/main" */ '@/pages/Main/Main');
});

export const AboutUsPage = LazyComponent(<LayoutPreloader />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/about-us/about-us" */ '@/pages/AboutUs/AboutUs');
});

export const CatalogPage = LazyComponent(<LayoutPreloader />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/catalog/catalog" */ '@/pages/Catalog/Catalog');
});

export const CartPage = LazyComponent(<LayoutPreloader />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/cart/cart" */ '@/pages/Cart/Cart');
});

export const NotFoundPage = LazyComponent(<LayoutPreloader />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/not-found/not-found" */ '@/pages/NotFound/NotFound');
});

export const UserProfilePage = LazyComponent(<LayoutPreloader />, async () => {
  await delay(1000);
  return import(/* webpackChunkName: "pages/user-profile/user-profile" */ '@/pages/UserProfile/UserProfile');
});
