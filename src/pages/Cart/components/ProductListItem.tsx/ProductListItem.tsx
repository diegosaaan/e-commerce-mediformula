/* eslint-disable no-empty-pattern */
import React, { ReactElement, useState } from 'react';
import Button from '@/components/Button/Button';
import './ProductListItem.scss';

const ProductListItem = (
  {
    /* productData */
  }
): ReactElement => {
  const [productCount, setProductCount] = useState(1);

  const handleCounterButtonsClicked = (changeAmount: number): void => {
    setProductCount((prevValue) => prevValue + changeAmount);
  };

  return (
    <li className="cart__product-list-item">
      <div className="cart__product-list-item-description">
        <div className="cart__product-list-item-image-container"></div>
        <h3 className="cart__product-list-item-heading">Тонометр AND UA-1300 с речевым выходом и сетевым адаптером</h3>
      </div>
      <div className="cart__product-list-item-buttons-container">
        <div className="cart__product-list-item-counter-container">
          <Button
            className="cart__product-list-item-decrease-count"
            type="button"
            onClick={(): void => handleCounterButtonsClicked(-1)}
          >
            –
          </Button>
          <p className="cart__product-list-item-counter">{productCount}</p>
          <Button
            className="cart__product-list-item-increase-count"
            type="button"
            onClick={(): void => handleCounterButtonsClicked(1)}
          >
            +
          </Button>
        </div>
        <div className="cart__product-list-item-price-container">
          <div className="cart__product-list-item-current-price">1 520₽</div>
          <div className="cart__product-list-item-prev-price">1 600₽</div>
        </div>
        <Button className="cart__product-list-item-delete-button" type="button" />
      </div>
    </li>
  );
};

export default ProductListItem;
