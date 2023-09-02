import React, { ReactElement } from 'react';
import Intro from './components/intro-section/Intro';
import ProductCardsSection from '@/components/ProductCardsSection/ProductCardsSection';
import CategoryCards from './components/category-section/CategoryCards';
import Brends from './components/brends-section/Brends';
import MediaSection from './components/media-section/Media';
import Advantages from './components/advantages-section/Advantages';
import Services from './components/services-section/Services';

const MainPage = (): ReactElement => {
  return (
    <div className="main-page">
      <Intro />
      <ProductCardsSection heading="Специальные предложения" counter={11} sectionClassName="discounted-products" />
      <CategoryCards />
      <Brends />
      <Advantages />
      <Services />
      <MediaSection />
    </div>
  );
};

export default MainPage;
