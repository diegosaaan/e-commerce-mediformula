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
      <ProductCardsSection header="Популярное" counter={15} sectionClassName="popular" />
      <CategoryCards />
      <Brends />
      <Advantages />
      <Services />
      <ProductCardsSection header="Специальные предложения" sectionClassName="special-offers" counter={15} />
      <MediaSection />
    </div>
  );
};

export default MainPage;
