import React, { ReactElement } from 'react';
import Brends from './components/brends-section/Brends';
import MediaSection from './components/media-section/Media';
import Advantages from './components/advantages-section/Advantages';
import Services from './components/services-section/Services';

const MainPage = (): ReactElement => (
  <div className="main-page">
    <Brends />
    <Advantages />
    <Services />
    <MediaSection />
  </div>
);

export default MainPage;
