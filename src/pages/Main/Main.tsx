import '@/pages/Main/Main.scss';
import React, { ReactElement } from 'react';
import Intro from './components/intro-section/Intro';
import ProductCardsSection from '@/components/ProductCardsSection/ProductCardsSection';
import CategoryCards from './components/category-section/CategoryCards';

function MainPage(): ReactElement {
  return (
    <div className="main-page">
      <Intro />
      <ProductCardsSection header="Популярное" counter={15} />
      <CategoryCards />
      <ProductCardsSection header="Специальные предложения" counter={15} />
    </div>
  );
}

export default MainPage;
