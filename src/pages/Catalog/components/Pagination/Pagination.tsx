/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import './Pagination.scss';
import React, { ReactElement } from 'react';
import { IPaginationProps } from '@/types/componentsInrefaces';

const Pagination = ({
  isDataFetching,
  currentProductsData,
  getNewProductList,
  setCurrentProductList,
  pageOffset,
  currentCategoryRef,
}: IPaginationProps): ReactElement | string => {
  const { currentPage, currentProductList, totalProducts } = currentProductsData;

  const handleScrollToTop = (): void => {
    if (currentCategoryRef.current) {
      currentCategoryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFirstPageBtnClicked = async (): Promise<void> => {
    pageOffset.current = 0;
    await getNewProductList();
    handleScrollToTop();
    setCurrentProductList((prevProductsData) => ({
      ...prevProductsData,
      currentPage: 1,
    }));
  };

  const handleNextPageBtnClicked = async (): Promise<void> => {
    const { currentPage } = currentProductsData;
    pageOffset.current += 4;
    await getNewProductList();
    handleScrollToTop();
    setCurrentProductList((prevProductsData) => ({
      ...prevProductsData,
      currentPage: currentPage + 1,
    }));
  };

  const handlePrevPageBtnClicked = async (): Promise<void> => {
    const { currentPage } = currentProductsData;
    pageOffset.current -= 4;
    await getNewProductList();
    handleScrollToTop();
    setCurrentProductList((prevProductsData) => ({
      ...prevProductsData,
      currentPage: currentPage - 1,
    }));
  };

  const handleLastPageBtnClicked = async (): Promise<void> => {
    const { totalProducts } = currentProductsData;
    pageOffset.current = totalProducts - (totalProducts % 4 || 4);
    await getNewProductList();
    handleScrollToTop();
    setCurrentProductList((prevProductsData) => ({
      ...prevProductsData,
      currentPage: Math.ceil(totalProducts / 4),
    }));
  };

  return currentProductList.length > 0 ? (
    <ul className="catalog__product-list-pagination">
      <li className="catalog__product-list-pagination-item">
        <button
          className="catalog__product-list-pagination-first-page-btn catalog__product-list-pagination-btn"
          disabled={isDataFetching || currentPage === 1}
          onClick={handleFirstPageBtnClicked}
        >
          {'<<'}
        </button>
      </li>
      <li className="catalog__product-list-pagination-item">
        <button
          className={`catalog__product-list-pagination-prev-page-btn catalog__product-list-pagination-btn `}
          disabled={isDataFetching || !(currentPage > 1)}
          onClick={handlePrevPageBtnClicked}
        >
          {'<'}
        </button>
      </li>
      <li className="catalog__product-list-pagination-item catalog__product-list-pagination-current-page">
        {currentPage}
      </li>
      <li className="catalog__product-list-pagination-item">
        <button
          className="catalog__product-list-pagination-next-page-btn catalog__product-list-pagination-btn"
          onClick={handleNextPageBtnClicked}
          disabled={isDataFetching || !((currentPage - 1) * 4 + currentProductList.length < totalProducts)}
        >
          {'>'}
        </button>
      </li>
      <li className="catalog__product-list-pagination-item ">
        <button
          className="catalog__product-list-pagination-last-page-btn catalog__product-list-pagination-btn"
          disabled={isDataFetching || currentProductList.length < 4 || !(totalProducts - currentPage * 4 > 0)}
          onClick={handleLastPageBtnClicked}
        >
          {'>>'}
        </button>
      </li>
    </ul>
  ) : (
    ''
  );
};

export default Pagination;
