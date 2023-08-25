import React, { ReactElement, useState } from 'react';
import '@/components/Card/Card.scss';
import { useParams } from 'react-router-dom';
import ProductCardsData from '@/components/ProductCardsSection/ProductCardsData';
import Button from '@/components/Button/Button';
import { NotFoundPage } from '@/routes/lazyPages';

const ProductInfo = (): ReactElement => {
  const [isSelected, setIsSelected] = useState(false);
  const { idCard } = useParams();
  const index = Number(idCard);

  return ProductCardsData[index] ? (
    <div className="product-card">
      <div className="product-card__image-container">
        <div className="product-card__discount">
          <p className="product-card__discount-text">{`-${ProductCardsData[index].discount}%`}</p>
        </div>
        <div className="product-card__image">
          <img className="product-card__image-image" src={ProductCardsData[index].imagePath} alt="Product Image" />
        </div>
      </div>
      <div className="product-card__rating-container">
        <div className="product-card__rating-icon"></div>
        <p className="product-card__rating-text">{ProductCardsData[index].rating}</p>
      </div>
      <p className="product-card__text">{ProductCardsData[index].text}</p>
      <div className="product-card__price-info">
        <div className="product-card__price-container">
          <p className="product-card__price">{`${ProductCardsData[index].price}₽`}</p>
          <p className="product-card__priceBefore">{ProductCardsData[index].priceBefore}</p>
        </div>
        <div className="product-card__bonus-container">
          <div className="product-card__bonus-icon"></div>
          <p className="product-card__bonus-text">{`+${ProductCardsData[index].bonus}`}</p>
        </div>
      </div>
      <div className="product-card__button-container">
        <Button className="button" type="button" text="В корзину" onClick={(): void => {}} />
        <Button
          className={`iconButton ${isSelected ? 'iconButton__selected' : ''}`}
          type="button"
          onClick={(): void => {
            setIsSelected(!isSelected);
          }}
        />
      </div>
    </div>
  ) : (
    <NotFoundPage />
  );
};

export default ProductInfo;
