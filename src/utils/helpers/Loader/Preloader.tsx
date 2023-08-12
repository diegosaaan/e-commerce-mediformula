import React, { ReactElement } from 'react';
import './Preloader.scss';

const Preloader = (): ReactElement => {
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

export default Preloader;
