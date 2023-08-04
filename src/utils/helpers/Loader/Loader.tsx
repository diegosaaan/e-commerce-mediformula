import './Loader.scss';
import React, { ReactElement } from 'react';

function Loader(): ReactElement {
  return (
    <div className="loader-page">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
