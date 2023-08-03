import '@/pages/NotFound/NotFound.scss';
import React, { ReactElement } from 'react';
import Header from '@/components/Header/Header';

function NotFoundPage(): ReactElement {
  return (
    <div className="not-found-page">
      <h1>Страница 404</h1>
      <Header />
      <main></main>
    </div>
  );
}

export default NotFoundPage;
