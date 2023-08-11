import '@/pages/Main/Main.scss';
import React, { ReactElement } from 'react';
import Intro from './components/Intro';
import ProductCardsSection from '@/components/ProductCardsSection/ProductCardsSection';
import CategoryCards from './components/CategoryCards';

function MainPage(): ReactElement {
  return (
    <div className="main-page">
      <Intro />
      <ProductCardsSection header="Популярное" counter={15} />
      <CategoryCards />
    </div>
  );
}

export default MainPage;
