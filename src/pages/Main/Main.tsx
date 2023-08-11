import React, { ReactElement } from 'react';
import Brends from './components/brends-section/Brends';
import MediaSection from './components/media-section/Media';
import Advantages from './components/advantages-section/Advantages';

const MainPage = (): ReactElement => (
  <div className="main-page">
    <Brends />
    <Advantages />
    <MediaSection />
  </div>
);

export default MainPage;
