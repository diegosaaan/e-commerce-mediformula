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
  return import('@/pages/Login/Login');
});

export const RegistrationPage = LazyComponent(<LoginPreloader />, async () => {
  await delay(1000);
  return import('@/pages/Registration/Registration');
});

export const MainPage = LazyComponent(<LayoutPreloader />, async () => {
  await delay(1000);
  return import('@/pages/Main/Main');
});

export const AboutUsPage = LazyComponent(<LayoutPreloader />, async () => {
  await delay(1000);
  return import('@/pages/AboutUs/AboutsUs');
});

export const CatalogPage = LazyComponent(<LayoutPreloader />, async () => {
  await delay(1000);
  return import('@/pages/Catalog/Catalog');
});

export const CartPage = LazyComponent(<LayoutPreloader />, async () => {
  await delay(1000);
  return import('@/pages/Cart/Cart');
});

export const NotFoundPage = LazyComponent(<LayoutPreloader />, async () => {
  await delay(1000);
  return import('@/pages/NotFound/NotFound');
});

export const UserProfilePage = LazyComponent(<LayoutPreloader />, async () => {
  await delay(1000);
  return import('@/pages/UserProfile/UserProfile');
});
