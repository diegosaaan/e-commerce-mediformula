/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement } from 'react';
import './CirclePreloader.scss';

const CirclePreloader = ({
  pageClassname,
  classModificator,
  isDataFetching,
}: {
  pageClassname: string;
  classModificator?: string;
  isDataFetching?: boolean;
}): ReactElement => {
  return (
    <div
      className={`circle-preloader ${pageClassname}__circle-preloader ${pageClassname}__circle-preloader--${classModificator}`}
    >
      <div
        className={`circle-preloader-container ${pageClassname}__circle-preloader-container ${pageClassname}__circle-preloader-container--${classModificator}`}
      >
        <span
          className={`circle-preloader-round ${pageClassname}__circle-preloader-round ${pageClassname}__circle-preloader-round--${classModificator}`}
        ></span>
      </div>
    </div>
  );
};

export default CirclePreloader;
