import React, { ReactElement } from 'react';

const PaginationButton = ({
  text,
  onClick,
  disabled,
}: {
  text: string;
  onClick: () => void;
  disabled: boolean;
}): ReactElement => (
  <li className="catalog__product-list-pagination-item">
    <button className={`catalog__product-list-pagination-btn`} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  </li>
);

export default PaginationButton;
