import './Catalog.scss';
import React, { ReactElement, useEffect, useState, MouseEvent, useRef, MutableRefObject } from 'react';
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
import SpinnerPreloader from '@/utils/helpers/Loader/SpinnerPreloader/SpinnerPreloader';
import Pagination from './components/Pagination/Pagination';

export const catalogLoader = async (): Promise<{ initialData: IAllProductData; wasSearchByText: boolean }> => {
  let url: string;
  let wasSearchByText: boolean = false;
  const searchInput = document.querySelector('.header__input-search');
  if (searchInput && searchInput instanceof HTMLInputElement && searchInput.value) {
    url = `${ApiEndpoints.URL_CATALOG_PRODUCTS}/search?fuzzy=true&text.ru=${searchInput.value}&limit=4`;
    wasSearchByText = true;
  } else {
    url = `${ApiEndpoints.URL_CATALOG_PRODUCTS}/search?sort=price asc&limit=4`;
  }
  const initialData = await getProducts(url);
  return { initialData, wasSearchByText };
};

const CatalogPage = (): ReactElement => {
  const { initialData, wasSearchByText } = useLoaderData() as {
    initialData: IAllProductData;
    wasSearchByText: boolean;
  };
  const isSearchByText = useRef(wasSearchByText);
  const [currentProductsData, setCurrentProductList] = useState({
    currentProductList: initialData.results,
    totalProducts: initialData.total,
    currentPage: 1,
  });
  const [breadcrumbsData, setBreadcrumbsData] = useState<IBreadcrumbsData[]>(initialBreadCrumbsData);
  const [currentCategory, setCurrentCategory] = useState('Все категории');
  const [categoryId, setCategoryId] = useState('');
  const [isInStockFilter, setisInStockFilter] = useState(false);
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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDataFetching, setIsDataFetching] = useState(false);
  const searchButton = document.querySelector('.header__button-search') as HTMLInputElement;
  const searchInput = document.querySelector('.header__input-search') as HTMLButtonElement;
  const pageOffset = useRef(0);

  const createUrl = (searchText?: string): string => {
    const filters = [];
    const { maxPrice, minPrice } = priceRangeValue;
    const filterData: { [key: string]: string } = {
      searchText: searchText || isSearchByText.current ? `fuzzy=true&text.ru=${searchText || searchInput.value}` : '',
      categoryId: categoryId ? `filter=categories.id:"${categoryId}"` : '',
      inStock: isInStockFilter ? `filter=variants.attributes.in-stock:"${isInStockFilter}"` : '',
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

    // eslint-disable-next-line no-restricted-syntax
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
      setCurrentProductList((prevProductsData) => ({
        ...prevProductsData,
        currentProductList: results,
        totalProducts: total,
      }));
      setIsDataFetching(false);
    }, 1000);
  };

  const handleChangeCategory = async (event: MouseEvent): Promise<void> => {
    if (event.target) {
      const target = event.target as HTMLLIElement;
      isSearchByText.current = false;
      pageOffset.current = 0;
      setCurrentProductList((prevProductsData) => ({ ...prevProductsData, currentPage: 1 }));
      if (target.id === categoryId) {
        getNewProductList();
      } else if (target.id !== categoryId) {
        setIsDataFetching(true);
        setCategoryId(target.id);
        setCurrentCategory(target.textContent?.replace('•', '') || '');
        const newBreadCrumbsData = await createBreadcrumbs(target.id);
        setBreadcrumbsData(newBreadCrumbsData);
      }
    }
  };

  const openFirstProductListPage = (): void => {
    isSearchByText.current = false;
    pageOffset.current = 0;
    setCurrentProductList((prevProductsData) => ({ ...prevProductsData, currentPage: 1 }));
  };

  const handleToogleAccordion = (): void => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleChangeSortType = (event: MouseEvent): void => {
    const target = event.target as HTMLLIElement;
    pageOffset.current = 0;
    setCurrentProductList((prevProductsData) => ({ ...prevProductsData, currentPage: 1 }));
    setCurrentSortType(target.textContent || 'Сначала дешевле');
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleSearchButtonClicked = (): void => {
    if (searchInput.value) {
      openFirstProductListPage();
      isSearchByText.current = true;
      getNewProductList(searchInput.value);
    }
  };

  const handleOpenSidebar = (): void => {
    setIsMobileSidebarOpen(true);
  };

  const handleCloseSidebar = (): void => {
    setIsMobileSidebarOpen(false);
  };

  searchButton.onclick = handleSearchButtonClicked;
  const currentCategoryRef: MutableRefObject<null> | MutableRefObject<HTMLHeadingElement> = useRef(null);

  useEffect(() => {
    if (isInitialized) {
      getNewProductList();
    } else {
      setIsInitialized(true);
    }
  }, [categoryId, isDiscountFilter, isPriceFilter, brandsFilter, currentSortType, isInStockFilter]);

  return (
    <div className="catalog-page catalog">
      <div
        className={`catalog__darkened-popup ${isMobileSidebarOpen ? 'catalog__darkened-popup--active' : ''}`}
        onClick={handleCloseSidebar}
      ></div>
      <div className={`_container catalog__container`}>
        <ul className="catalog__breadcrumb-list">{renderBrendcrumbs(breadcrumbsData, handleChangeCategory)}</ul>
        <h2 ref={currentCategoryRef} className="catalog__current-category">
          {currentCategory}
        </h2>
        <div className="catalog__main-content-container">
          <CatalogSidebar
            getNewProductList={getNewProductList}
            openFirstProductListPage={openFirstProductListPage}
            handleChangeCategory={handleChangeCategory}
            setisInStockFilter={setisInStockFilter}
            setIsDiscountFilter={setIsDiscountFilter}
            setIsPriceFilter={setIsPriceFilter}
            setPriceRangeValue={setPriceRangeValue}
            setBrandsFilter={setBrandsFilter}
            handleCloseSidebar={handleCloseSidebar}
            isInStockFilter={isInStockFilter}
            isDiscountFilter={isDiscountFilter}
            isPriceFilter={isPriceFilter}
            priceRangeValue={priceRangeValue}
            brandsFilter={brandsFilter}
            isMobileSidebarOpen={isMobileSidebarOpen}
            isDataFetching={isDataFetching}
          />
          <div className="catalog__products-container">
            <div className="catalog__settings-button-container">
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
              <button
                title="open filters button"
                className="catalog__open-filters-button"
                onClick={handleOpenSidebar}
              ></button>
            </div>

            <ul className={`catalog__products-list ${isDataFetching ? 'catalog__products-list--pointer-events' : ''}`}>
              {currentProductsData.currentProductList.length > 0 ? (
                currentProductsData.currentProductList.map((product: IProductData) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <li className="catalog__products-empty-list-heading">
                  К сожалению, по вашему запросу ничего не найдено. Пожалуйста, попробуйте изменить параметры поиска.
                </li>
              )}
            </ul>
            <SpinnerPreloader pageClassname="catalog" isDataFetching={isDataFetching} />
            <Pagination
              isDataFetching={isDataFetching}
              currentProductsData={currentProductsData}
              getNewProductList={getNewProductList}
              setCurrentProductList={setCurrentProductList}
              pageOffset={pageOffset}
              currentCategoryRef={currentCategoryRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
