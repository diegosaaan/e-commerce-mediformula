/* eslint-disable no-empty-pattern */
import React, { ReactElement, useState } from 'react';
import Button from '@/components/Button/Button';
import './ProductListItem.scss';
import { IProductListItem } from '@/types/apiInterfaces';

const ProductListItem = ({ productData }: IProductListItem): ReactElement => {
  const [productCount, setProductCount] = useState(productData.quantity);

  const handleCounterButtonsClicked = (changeAmount: number): void => {
    setProductCount((prevValue: number) => prevValue + changeAmount);
  };

  return (
    <li className="cart__product-list-item">
      <div className="cart__product-list-item-description">
        <div
          className="cart__product-list-item-image-container"
          style={{ backgroundImage: `url(${productData.variant.images[0].url})` }}
        ></div>
        <h3 className="cart__product-list-item-heading">{productData.name.ru}</h3>
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
          <div className="cart__product-list-item-current-price">{`${productData.price.value.centAmount}₽`}</div>
          <div className="cart__product-list-item-prev-price">
            {(productData.price.discounted && `${productData.price.discounted.value.centAmount}₽`) || ''}
          </div>
        </div>
        <Button className="cart__product-list-item-delete-button" type="button" />
      </div>
    </li>
  );
};

export default ProductListItem;
