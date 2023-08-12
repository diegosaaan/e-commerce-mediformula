import React, { ComponentType, ReactElement, Suspense, lazy } from 'react';
import Preloader from '@/utils/helpers/Loader/Preloader';

// eslint-disable-next-line no-promise-executor-return
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const LazyComponent = (importFunction: () => Promise<{ default: ComponentType<unknown> }>): (() => ReactElement) => {
  const Component = lazy(importFunction);

  return (): ReactElement => (
    <Suspense fallback={<Preloader />}>
      <Component />
    </Suspense>
  );
};

export const MainPage = LazyComponent(async () => {
  await delay(1000);
  return import('@/pages/Main/Main');
});

export const AboutUsPage = LazyComponent(async () => {
  await delay(1000);
  return import('@/pages/AboutUs/AboutsUs');
});

export const CatalogPage = LazyComponent(async () => {
  await delay(1000);
  return import('@/pages/Catalog/Catalog');
});

export const CartPage = LazyComponent(async () => {
  await delay(1000);
  return import('@/pages/Cart/Cart');
});

export const NotFoundPage = LazyComponent(async () => {
  await delay(1000);
  return import('@/pages/NotFound/NotFound');
});

export const UserProfilePage = LazyComponent(async () => {
  await delay(1000);
  return import('@/pages/UserProfile/UserProfile');
});
