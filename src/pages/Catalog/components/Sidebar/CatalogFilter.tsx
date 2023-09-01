import React, { ReactElement } from 'react';

interface ICatalogFilterProps {
  label: string;
  checked: boolean;
  children?: ReactElement;
  onChange: () => void;
}

const CatalogFilter = ({ label, checked, onChange, children }: ICatalogFilterProps): ReactElement => {
  return (
    <div className="catalog__filter-container">
      <div className="catalog__filter-input-heading">{label}</div>
      <div className="catalog__filter-input-container">
        <input
          className="catalog__filter-input"
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id={`catalog-filter-${label.toLowerCase()}-input`}
        />
        <label className="catalog__filter-label" htmlFor={`catalog-filter-${label.toLowerCase()}-input`} />
      </div>
      {children}
    </div>
  );
};

export default CatalogFilter;
