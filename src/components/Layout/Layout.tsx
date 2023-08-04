import React, { ReactElement } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const pagesWithoutHeaderAndFooter = ['/login', '/registration'];

export default function Layout(): ReactElement {
  const location = useLocation().pathname;
  const shouldShowHeaderAndFooter = !pagesWithoutHeaderAndFooter.includes(location);

  return (
    <>
      {shouldShowHeaderAndFooter && <Header />}
      <main className="main">
        <Outlet />
      </main>
      {shouldShowHeaderAndFooter && <Footer />}
    </>
  );
}
