import './AuthPreloader.scss';
import React, { ReactElement } from 'react';

const LoginPreloader = (): ReactElement => {
  return (
    <div className="auth-preloader">
      <div className="preloader">
        <div className="preloader__container">
          <span className="preloader__round"></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPreloader;
