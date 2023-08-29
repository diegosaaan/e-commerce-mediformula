import './Sidebar.scss';
import React, { ChangeEvent, ReactElement, MouseEvent } from 'react';
import { categoriesData, renderCategories } from './categoriesData';
import CatalogFilter from './CatalogFilter';
import brandNames from './brandsData';

interface ICatalogSidebarProps {
  handleChangeCategory: (event: MouseEvent) => Promise<void>;
  handleChangeDiscountFilter: () => void;
  handleChangePriceFilter: () => void;
  handleChangePriceRange: (event: ChangeEvent, range: string) => void;
  handlePriceInputsOnBlur: () => void;
  handleChangeBrandsFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  isDiscountFilter: boolean;
  isPriceFilter: boolean;
  priceRangeValue: {
    minPrice: number;
    maxPrice: number;
  };
}

const CatalogSidebar = ({
  handleChangeCategory,
  handleChangeDiscountFilter,
  handleChangePriceFilter,
  handleChangePriceRange,
  handlePriceInputsOnBlur,
  handleChangeBrandsFilter,
  isDiscountFilter,
  isPriceFilter,
  priceRangeValue,
}: ICatalogSidebarProps): ReactElement => {
  return (
    <aside className="catalog__sidebar">
      <ul className="catalog__category-list catalog__category-list--padding-bottom-scroll">
        {renderCategories(categoriesData, true, handleChangeCategory)}
      </ul>

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
    </aside>
  );
};

export default CatalogSidebar;
