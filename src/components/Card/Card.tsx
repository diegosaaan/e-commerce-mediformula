import React, { ReactElement, useState } from 'react';
import '@/components/Card/Card.scss';
import { IPropsCard } from '@/types/interfaces';
import Button from '../Button/Button';

const Card = ({ imagePath, rating, text, price, priceBefore, bonus, discount, onClick }: IPropsCard): ReactElement => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-card__image-container">
        <div className="product-card__discount">
          <p className="product-card__discount-text">{`-${discount}%`}</p>
        </div>
        <div className="product-card__image">
          <img className="product-card__image-image" src={imagePath} alt="Product Image" />
        </div>
      </div>
      <div className="product-card__rating-container">
        <div className="product-card__rating-icon"></div>
        <p className="product-card__rating-text">{rating}</p>
      </div>
      <p className="product-card__text">{text}</p>
      <div className="product-card__price-info">
        <div className="product-card__price-container">
          <p className="product-card__price">{`${price}₽`}</p>
          <p className="product-card__priceBefore">{priceBefore}</p>
        </div>
        <div className="product-card__bonus-container">
          <div className="product-card__bonus-icon"></div>
          <p className="product-card__bonus-text">{`+${bonus}`}</p>
        </div>
      </div>
      <div className="product-card__button-container">
        <Button
          className="button"
          type="button"
          text="В корзину"
          onClick={(): void => {
            console.log('Clicked button!');
          }}
        />
        <Button
          className={`iconButton ${isSelected ? 'iconButton__selected' : ''}`}
          type="button"
          onClick={(): void => {
            setIsSelected(!isSelected);
          }}
        />
      </div>
    </div>
  );
};

export default Card;
