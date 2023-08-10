import React, { ReactElement } from 'react';
import Brends from './components/brends-section/Brends';
import MediaSection from './components/media-section/Media';

const MainPage = (): ReactElement => (
  <div className="main-page">
    <Brends />
    <MediaSection />
  </div>
);

export default MainPage;
