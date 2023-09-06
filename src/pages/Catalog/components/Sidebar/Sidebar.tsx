import './Sidebar.scss';
import React, { ChangeEvent, ReactElement } from 'react';
import { categoriesData, renderCategories } from './categoriesData';
import CatalogFilter from './CatalogFilter';
import brandNames from './brandsData';
import { ICatalogSidebarProps } from '@/types/componentsInrefaces';
import Button from '@/components/Button/Button';

const CatalogSidebar = ({
  getNewProductList,
  openFirstProductListPage,
  handleChangeCategory,
  setIsInStockFilter,
  setIsDiscountFilter,
  setIsPriceFilter,
  setPriceRangeValue,
  setBrandsFilter,
  handleCloseSidebar,
  handleResetFilters,
  isInStockFilter,
  isDiscountFilter,
  isPriceFilter,
  priceRangeValue,
  brandsFilter,
  isMobileSidebarOpen,
  isDataFetching,
}: ICatalogSidebarProps): ReactElement => {
  const handleChangeInStockFilter = (): void => {
    openFirstProductListPage();
    setIsInStockFilter(!isInStockFilter);
  };

  const handleChangeDiscountFilter = (): void => {
    openFirstProductListPage();
    setIsDiscountFilter(!isDiscountFilter);
  };

  const handleChangePriceFilter = (): void => {
    openFirstProductListPage();
    setIsPriceFilter(!isPriceFilter);
  };

  const handlePriceInputsOnBlur = (): void => {
    if (isPriceFilter) {
      openFirstProductListPage();
      getNewProductList();
    }
  };

  const handleChangeBrandsFilter = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      const newBrandFilter = target.id;
      openFirstProductListPage();

      if (brandsFilter.includes(newBrandFilter)) {
        setBrandsFilter(brandsFilter.filter((brand: string) => brand !== newBrandFilter));
      } else {
        setBrandsFilter([...brandsFilter, newBrandFilter]);
      }
    }
  };

  const handleChangePriceRange = (event: ChangeEvent, range: string): void => {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      const newValue = parseFloat(target.value);

      if (!Number.isNaN(newValue) || !newValue) {
        if (range === 'min') {
          setPriceRangeValue({
            ...priceRangeValue,
            minPrice: newValue || 0,
          });
        } else {
          setPriceRangeValue({
            ...priceRangeValue,
            maxPrice: newValue || 0,
          });
        }
      }
    }
  };

  return (
    <aside
      className={`catalog__sidebar ${isMobileSidebarOpen ? 'catalog__mobile-sidebar--active' : ''} ${
        isDataFetching ? 'catalog__sidebar--opacity' : ''
      }`}
    >
      <div className="catalog__sidebar-close-button-container">
        <button
          title="sidebar close button"
          className="catalog__sidebar-close-button"
          onClick={handleCloseSidebar}
        ></button>
      </div>

      <ul className="catalog__category-list catalog__category-list--padding-bottom-scroll">
        {renderCategories(categoriesData, true, handleChangeCategory)}
      </ul>

      <CatalogFilter label="Товары в наличии" checked={isInStockFilter} onChange={handleChangeInStockFilter} />
      <CatalogFilter label="Товары по акции" checked={isDiscountFilter} onChange={handleChangeDiscountFilter} />

      <CatalogFilter
        label="Цена, ₽"
        checked={isPriceFilter}
        onChange={handleChangePriceFilter}
        children={
          <div className="catalog__price-range-container">
            <input
              className="catalog__price-range-input"
              type="text"
              value={priceRangeValue.minPrice}
              onChange={(event): void => handleChangePriceRange(event, 'min')}
              onBlur={handlePriceInputsOnBlur}
            />
            <span className="catalog__range-input-line"></span>
            <input
              className="catalog__price-range-input"
              type="text"
              value={priceRangeValue.maxPrice}
              onChange={(event): void => handleChangePriceRange(event, 'max')}
              onBlur={handlePriceInputsOnBlur}
            />
          </div>
        }
      />
      <div className="catalog__filter-container catalog__brands-filter-container">
        <div className="catalog__filter-input-heading">Бренд</div>
        <div className="catalog__filter-input-container">
          <ul className="catalog__brands-filter-list">
            {brandNames.map((brand) => (
              <li className="catalog__brands-filter-list-item" key={brand}>
                <input
                  type="checkbox"
                  checked={!!brandsFilter.includes(brand)}
                  className="catalog__brand-checkbox"
                  id={brand}
                  onChange={handleChangeBrandsFilter}
                />
                <label htmlFor={brand} className="catalog__brand-label">
                  {brand}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button
        onClick={handleResetFilters}
        type="button"
        text="Сбросить фильтры"
        className="button catalog__reset-filters-button"
      />
    </aside>
  );
};

export default CatalogSidebar;
