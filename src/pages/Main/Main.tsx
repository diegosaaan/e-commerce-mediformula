import React, { ReactElement } from 'react';
import { useNavigation } from 'react-router-dom';
import Intro from './components/intro-section/Intro';
import SwiperSection from '@/components/SwiperSection/SwiperSection';
import CategoryCards from './components/category-section/CategoryCards';
import Brends from './components/brends-section/Brends';
import MediaSection from './components/media-section/Media';
import Advantages from './components/advantages-section/Advantages';
import Services from './components/services-section/Services';
import CirclePreloader from '@/components/Preloaders/CirclePreloader/CirclePreloader';

const MainPage = (): ReactElement => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <CirclePreloader pageClassname="catalog" />;
  }

  return (
    <div className="main-page">
      <Intro />
      <SwiperSection heading="Специальные предложения" counter={11} sectionClassName="discounted-products" />
      <CategoryCards />
      <Brends />
      <Advantages />
      <Services />
      <MediaSection />
    </div>
  );
};

export default MainPage;
