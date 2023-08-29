/* eslint-disable no-restricted-syntax */
import './Catalog.scss';
import React, { ChangeEvent, ReactElement, useEffect, useState, MouseEvent, useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import ApiEndpoints from '@/enums/apiEndpoints';
import CatalogSidebar from './components/Sidebar/Sidebar';
import { IBreadcrumbsData } from '@/types/componentsInrefaces';
import { getProducts } from '@/services/catalog';
import Accordion from '@/components/Accordion/Accrodion';
import sortData from './sortData/sortData';
import SortTypes from '@/enums/sortTypes';
import { createBreadcrumbs, initialBreadCrumbsData, renderBrendcrumbs } from './breadcrumbsData/breadcrumbsData';
import { IAllProductData, IProductData } from '@/types/apiInterfaces';
import ProductCard from './components/ProductCard/ProductCard';
import CatalogListPreloader from '@/utils/helpers/Loader/CatalogListPreloader/CatalogListPreloader';

export const catalogLoader = async (): Promise<{ initialData: IAllProductData; isSearchByText: boolean }> => {
  let url: string;
  let isSearchByText = false;
  const searchInput = document.querySelector('.header__input-search');
  if (searchInput && searchInput instanceof HTMLInputElement) {
    url = `${ApiEndpoints.URL_CATALOG_PRODUCTS}/search?fuzzy=true&text.ru=${searchInput.value}&limit=4`;
    isSearchByText = true;
  } else {
    url = `${ApiEndpoints.URL_CATALOG_PRODUCTS}/search?sort=price asc&limit=4`;
  }

  const initialData = await getProducts(url);
  return { initialData, isSearchByText };
};

const CatalogPage = (): ReactElement => {
  const { initialData, isSearchByText } = useLoaderData() as { initialData: IAllProductData; isSearchByText: boolean };
  const [currentProductsData, setCurrentProductList] = useState({
    currentProductList: initialData.results,
    totalProducts: initialData.total,
    currentPage: 1,
    isNextPage: initialData.total > initialData.results.length,
    isPrevPage: false,
  });
  const [breadcrumbsData, setBreadcrumbsData] = useState<IBreadcrumbsData[]>(initialBreadCrumbsData);
  const [currentCategory, setCurrentCategory] = useState('Все категории');
  const [categoryId, setCategoryId] = useState('');
  const [isDiscountFilter, setIsDiscountFilter] = useState(false);
  const [isPriceFilter, setIsPriceFilter] = useState(false);
  const [priceRangeValue, setPriceRangeValue] = useState({
    minPrice: 0,
    maxPrice: 0,
  });
  const [brandsFilter, setBrandsFilter] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [currentSortType, setCurrentSortType] = useState('Сначала дешевле');
  const [isDataFetching, setIsDataFetching] = useState(false);
  const searchButton = document.querySelector('.header__button-search') as HTMLInputElement;
  const searchInput = document.querySelector('.header__input-search') as HTMLButtonElement;
  const pageOffset = useRef(0);
  console.log(pageOffset);
  console.log(currentProductsData.currentPage);

  const createUrl = (searchText?: string): string => {
    const filters = [];
    const { maxPrice, minPrice } = priceRangeValue;

    const filterData: { [key: string]: string } = {
      searchText: searchText || isSearchByText ? `fuzzy=true&&text.ru=${searchText || searchInput.value}` : '',
      categoryId: categoryId ? `filter=categories.id:"${categoryId}"` : '',
      discount: isDiscountFilter ? 'filter=variants.prices.discounted.discount.typeId:"product-discount"' : '',
      priceRange: isPriceFilter
        ? `filter=variants.price.centAmount:range (${minPrice * 100} to ${maxPrice * 100})`
        : '',
      brands: brandsFilter.length
        ? `filter=variants.attributes.brand.ru:${brandsFilter.map((brand) => `"${brand}"`).join(',')}`
        : '',
      sort:
        Object.keys(SortTypes).find((key) => SortTypes[key as keyof typeof SortTypes] === currentSortType) ||
        'sort=price asc',
    };

    for (const key in filterData) {
      if (filterData[key]) {
        filters.push(filterData[key]);
      }
    }

    const url = `${ApiEndpoints.URL_CATALOG_PRODUCTS}/search?${filters.join('&')}&limit=4&offset=${pageOffset.current}`;
    return url;
  };

  const getNewProductList = async (searchText?: string): Promise<void> => {
    const url = createUrl(searchText);
    setIsDataFetching(true);
    setTimeout(async () => {
      const { total, results } = await getProducts(url);
      const { currentPage } = currentProductsData;
      const isNextPage = (currentPage - 1) * 4 + results.length < total;
      const isPrevPage = currentPage > 1;
      setCurrentProductList((prevProductsData) => ({
        ...prevProductsData,
        currentProductList: results,
        totalProducts: total,
        isNextPage,
        isPrevPage,
      }));
      setIsDataFetching(false);
    }, 1000);
  };

  const handleChangeCategory = async (event: MouseEvent): Promise<void> => {
    if (event.target) {
      const target = event.target as HTMLLIElement;
      if (target.id === categoryId && searchInput.value) {
        getNewProductList();
      } else if (target.id !== categoryId) {
        pageOffset.current = 0;
        const newBreadCrumbsData = await createBreadcrumbs(target.id);
        setCategoryId(target.id);
        setBreadcrumbsData(newBreadCrumbsData);
        setCurrentCategory(target.textContent?.replace('•', '') || '');
        setCurrentProductList((prevProductsData) => ({ ...prevProductsData, currentPage: 1 }));
        setIsDataFetching(true);
      }
    }
  };

  const handleChangeDiscountFilter = (): void => {
    pageOffset.current = 0;
    setIsDiscountFilter(!isDiscountFilter);
    setCurrentProductList((prevProductsData) => ({ ...prevProductsData, currentPage: 1 }));
  };

  const handleChangePriceFilter = (): void => {
    pageOffset.current = 0;
    setIsPriceFilter(!isPriceFilter);
    setCurrentProductList((prevProductsData) => ({ ...prevProductsData, currentPage: 1 }));
  };

  const handleChangePriceRange = (event: ChangeEvent, range: string): void => {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      const newValue = parseFloat(target.value);

      if (!Number.isNaN(newValue) || !newValue) {
        if (range === 'min') {
          setPriceRangeValue((prevRange) => ({ ...prevRange, minPrice: newValue || 0 }));
        } else {
          setPriceRangeValue((prevRange) => ({ ...prevRange, maxPrice: newValue || 0 }));
        }
      }
    }
  };

  const handlePriceInputsOnBlur = (): void => {
    if (isPriceFilter) {
      getNewProductList();
      pageOffset.current = 0;
      setCurrentProductList((prevProductsData) => ({ ...prevProductsData, currentPage: 1 }));
    }
  };

  const handleChangeBrandsFilter = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      const newBrandFilter = target.id;
      pageOffset.current = 0;
      setCurrentProductList((prevProductsData) => ({ ...prevProductsData, currentPage: 1 }));

      if (brandsFilter.includes(newBrandFilter)) {
        setBrandsFilter(brandsFilter.filter((brand) => brand !== newBrandFilter));
      } else {
        setBrandsFilter((prevBrandsFilter) => [...prevBrandsFilter, newBrandFilter]);
      }
    }
  };

  const handleToogleAccordion = (): void => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleChangeSortType = (event: MouseEvent): void => {
    const target = event.target as HTMLLIElement;
    setCurrentSortType(target.textContent || 'Сначала дешевле');
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleSearchButtonClicked = (): void => {
    if (searchInput.value) {
      pageOffset.current = 0;
      getNewProductList(searchInput.value);
      setCurrentProductList((prevProductsData) => ({ ...prevProductsData, currentPage: 1 }));
    }
  };

  const handleNextPageBtnClicked = async (): Promise<void> => {
    const { currentPage } = currentProductsData;
    pageOffset.current += 4;
    await getNewProductList();
    setCurrentProductList((prevProductsData) => ({
      ...prevProductsData,
      currentPage: currentPage + 1,
    }));
  };

  searchButton.onclick = handleSearchButtonClicked;

  useEffect(() => {
    if (isInitialized) {
      getNewProductList();
    } else {
      setIsInitialized(true);
    }
  }, [categoryId, isDiscountFilter, isPriceFilter, brandsFilter, currentSortType]);

  return (
    <div className="catalog-page catalog">
      <div className="_container catalog__container">
        <ul className="catalog__breadcrumb-list">{renderBrendcrumbs(breadcrumbsData, handleChangeCategory)}</ul>
        <h2 className="catalog__current-category">{currentCategory}</h2>
        <div className="catalog__main-content-container">
          <CatalogSidebar
            handleChangeCategory={handleChangeCategory}
            handleChangeDiscountFilter={handleChangeDiscountFilter}
            handleChangePriceFilter={handleChangePriceFilter}
            handleChangePriceRange={handleChangePriceRange}
            handlePriceInputsOnBlur={handlePriceInputsOnBlur}
            handleChangeBrandsFilter={handleChangeBrandsFilter}
            isDiscountFilter={isDiscountFilter}
            isPriceFilter={isPriceFilter}
            priceRangeValue={priceRangeValue}
          />
          <div className="catalog__products-container">
            <Accordion
              sectionName="catalog"
              listName="sort"
              title={currentSortType}
              isOpen={isAccordionOpen}
              onClickAccordion={handleToogleAccordion}
            >
              {sortData
                .filter((sort) => sort !== currentSortType)
                .map((sort, index) => (
                  <li
                    key={index}
                    className="catalog__sort-list-item"
                    tabIndex={isAccordionOpen ? 0 : -1}
                    onClick={(event): void => handleChangeSortType(event)}
                  >
                    {sort}
                  </li>
                ))}
            </Accordion>
            <ul className={`catalog__products-list ${isDataFetching ? 'catalog__products-list--opacity' : ''}`}>
              {currentProductsData.currentProductList.length > 0 ? (
                currentProductsData.currentProductList.map((product: IProductData) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <li className="catalog__products-empty-list-heading">
                  К сожалению, товары по такому запросу не найдены
                </li>
              )}
            </ul>
            <CatalogListPreloader isDataFetching={isDataFetching} />
            <button disabled={isDataFetching || !currentProductsData.isPrevPage}>Prev page</button>
            <button onClick={handleNextPageBtnClicked} disabled={isDataFetching || !currentProductsData.isNextPage}>
              Next page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
