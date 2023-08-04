import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/hoc/AuthProvider';
import { IRouteData } from '@/types/interfaces';
import Layout from '@/components/Layout/Layout';
import NotFoundPage from '@/pages/NotFound/NotFound';
import privateRoutesData from './routesData/privateRoutesData';
import PrivateRoute from './routesHelpers/PrivateRoute';
import publicRoutesData from './routesData/publicRoutesData';
import PublicRoute from './routesHelpers/PublicRoute';

function AppRouter(): ReactElement {
  const publicRoutes = publicRoutesData.map(({ key, path, element }: IRouteData) => (
    <Route key={key} path={path} element={<PublicRoute page={key}>{element}</PublicRoute>} />
  ));
  const privateRoutes = privateRoutesData.map(({ element, ...rest }: IRouteData) => (
    <Route {...rest} element={<PrivateRoute>{element}</PrivateRoute>} />
  ));

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {publicRoutes}
          {privateRoutes}
          <Route key="Page not found" path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default AppRouter;
