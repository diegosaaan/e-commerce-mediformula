import React, { ReactElement } from 'react';
import './Card.scss';
import { IPropsCard } from '@/types/componentsInrefaces';
import Button from '../Button/Button';

const Card = ({ imagePath, text, price, priceBefore, discount }: IPropsCard): ReactElement => {
  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <div className="product-card__discount">
          <p className="product-card__discount-text">{`-${discount}%`}</p>
        </div>
        <div className="product-card__image">
          <img className="product-card__image-image" src={imagePath} alt="Product Image" />
        </div>
      </div>
      <p className="product-card__text">{text}</p>
      <div className="product-card__price-info">
        <div className="product-card__price-container">
          <p className="product-card__price">{`${
            price !== undefined ? Math.round(price).toLocaleString('ru-RU') : 'Не доступно'
          }₽`}</p>
          <p className="product-card__priceBefore">{`${priceBefore?.toLocaleString('ru-RU')}₽`}</p>
        </div>
      </div>
      <div className="product-card__button-container">
        <Button className="button" type="button" text="В корзину" onClick={(): void => {}} />
      </div>
    </div>
  );
};

export default Card;
