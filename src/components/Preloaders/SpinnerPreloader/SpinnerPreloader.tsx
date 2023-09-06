import React, { ReactElement } from 'react';
import './SpinnerPreloader.scss';

const SpinnerPreloader = ({
  pageClassname,
  classModificator,
  isDataFetching,
}: {
  pageClassname: string;
  classModificator?: string;
  isDataFetching: boolean;
}): ReactElement => {
  return (
    <span
      className={`spinner-preloader ${pageClassname}__spinner-preloader ${pageClassname}__spinner-preloader--${classModificator} ${
        isDataFetching
          ? `spinner-preloader--active ${pageClassname}__spinner-preloader--active ${pageClassname}__spinner-preloader--active--${classModificator}`
          : ''
      }`}
    ></span>
  );
};

export default SpinnerPreloader;
