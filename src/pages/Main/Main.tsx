import '@/pages/Main/Main.scss';
import React, { ReactElement } from 'react';
import Header from '@/components/Header/Header';

function MainPage(): ReactElement {
  return (
    <div className="main-page">
      <h1>Главная Страница</h1>
      <Header />
      <main></main>
    </div>
  );
}

export default MainPage;
