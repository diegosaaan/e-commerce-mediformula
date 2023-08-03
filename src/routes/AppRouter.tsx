import React, { ReactElement } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFound/NotFound';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import createPublicRoutes from './routesCreaters/publicRoutesCreater';
import createPrivateRoutes from './routesCreaters/privateRoutesCreater';

function AppRouter(): ReactElement {
  const location = useLocation().pathname;
  const isAuthenticated = true; // TODO function getToken
  const publicRoutes = createPublicRoutes();
  const privateRoutes = createPrivateRoutes(isAuthenticated);
  const pagesWithoutHeaderAndFooter = ['/login', '/registration'];
  const shouldShowHeaderAndFooter = !pagesWithoutHeaderAndFooter.includes(location);

  return (
    <>
      {shouldShowHeaderAndFooter && <Header />}
      <Routes>
        {publicRoutes}
        {privateRoutes}
        <Route key="Page not found" path="*" element={<NotFoundPage />} />
      </Routes>
      {shouldShowHeaderAndFooter && <Footer />}
    </>
  );
}

export default AppRouter;
