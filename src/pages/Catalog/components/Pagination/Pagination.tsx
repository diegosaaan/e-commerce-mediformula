import './Pagination.scss';
import React, { ReactElement } from 'react';
import { IPaginationProps } from '@/types/componentsInrefaces';
import PaginationButton from './PaginationButton';

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

  const handlePageChange = async (newPage: number): Promise<void> => {
    // eslint-disable-next-line no-param-reassign
    pageOffset.current = (newPage - 1) * 4;
    await getNewProductList();
    handleScrollToTop();
    setCurrentProductList((prevProductsData) => ({
      ...prevProductsData,
      currentPage: newPage,
    }));
  };

  return currentProductList.length > 0 ? (
    <ul className="catalog__product-list-pagination">
      <PaginationButton
        text="<<"
        onClick={(): Promise<void> => handlePageChange(1)}
        disabled={isDataFetching || currentPage === 1}
      />
      <PaginationButton
        text="<"
        onClick={(): Promise<void> => handlePageChange(currentPage - 1)}
        disabled={isDataFetching || !(currentPage > 1)}
      />
      <li className="catalog__product-list-pagination-item catalog__product-list-pagination-current-page">
        {currentPage}
      </li>
      <PaginationButton
        text=">"
        onClick={(): Promise<void> => handlePageChange(currentPage + 1)}
        disabled={isDataFetching || !((currentPage - 1) * 4 + currentProductList.length < totalProducts)}
      />
      <PaginationButton
        text=">>"
        onClick={(): Promise<void> => handlePageChange(Math.ceil(totalProducts / 4))}
        disabled={isDataFetching || currentProductList.length < 4 || !(totalProducts - currentPage * 4 > 0)}
      />
    </ul>
  ) : (
    ''
  );
};

export default Pagination;
