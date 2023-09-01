import React, { ReactElement } from 'react';
import './CatalogListPreloader.scss';

const CatalogListPreloader = ({ isDataFetching }: { isDataFetching: boolean }): ReactElement => {
  return <span className={`catalog__list-preloader ${isDataFetching ? 'catalog__list-preloader--active' : ''}`}></span>;
};

export default CatalogListPreloader;
