import '@/pages/NotFound/NotFound.scss';
import React, { ReactElement } from 'react';

function NotFoundPage(): ReactElement {
  return (
    <div className="not-found-page">
      <h1 style={{ textAlign: 'center' }}>Страница 404</h1>
    </div>
  );
}

export default NotFoundPage;
