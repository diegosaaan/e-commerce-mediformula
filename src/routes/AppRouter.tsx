import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IRouteData } from '@/types/interfaces';
import NotFoundPage from '@/pages/NotFound/NotFound';
import publicRoutesData from './routesData/publicRoutesData';
import privateRoutesData from './routesData/privateRoutesData';
import publicRoutesCreater from './routesCreaters/publicRoutesCreater';
import privateRoutesCreater from './routesCreaters/privateRoutesCreater';

function AppRouter(): ReactElement {
  const isAuthenticated = true; // TODO function geToken
  const publicRoutes = publicRoutesData.map((data: IRouteData) => publicRoutesCreater(data));
  const privateRoutes = privateRoutesData.map((data: IRouteData) => privateRoutesCreater(data, isAuthenticated));

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes}
        {privateRoutes}
        <Route key="Page not found" path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
