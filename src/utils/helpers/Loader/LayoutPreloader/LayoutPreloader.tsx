import React, { ReactElement } from 'react';
import './LayoutPreloader.scss';

const LayoutPreloader = (): ReactElement => {
  return (
    <>
      <div className="preloader">
        <div className="preloader__container">
          <span className="preloader__round"></span>
        </div>
      </div>
    </>
  );
};

export default LayoutPreloader;
