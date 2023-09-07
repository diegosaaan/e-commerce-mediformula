import React, { ReactElement } from 'react';
import './SwiperCard.scss';
import Button from '../Button/Button';
import { IProductData } from '@/types/apiInterfaces';
import DiscountsID from '@/enums/discountsID';

const SwiperCard = ({ productData }: { productData: IProductData }): ReactElement => {
  const {
    name: { ru: productName },
    masterVariant: {
      images: [{ url: imageUrl, label: imageAltText }],
      prices: [
        {
          value: { centAmount: defaultPrice },
          discounted,
        },
      ],
    },
  } = productData;

  let discountPrice = 0;
  let discountValue: keyof typeof DiscountsID | string = '';
  if (discounted) {
    discountPrice = discounted.value.centAmount;
    discountValue = `${DiscountsID[`${discounted.discount.id}` as keyof typeof DiscountsID]}`;
  }

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <div className="product-card__discount">
          {discountValue && <p className="product-card__discount-text">{discountValue}</p>}
        </div>
        <div className="product-card__image">
          <img className="product-card__image-image" src={imageUrl} alt={imageAltText} />
        </div>
      </div>
      <p className="product-card__text">{productName}</p>
      <div className="product-card__price-info">
        <div className="product-card__price-container">
          <p className="product-card__price">{`${Math.round(discountPrice / 100 || defaultPrice / 100).toLocaleString(
            'ru-RU'
          )}₽`}</p>
          <p className="product-card__priceBefore">{`${
            discountPrice ? `${Math.round(defaultPrice / 100).toLocaleString('ru-RU')}₽` : ''
          }`}</p>
        </div>
      </div>
      <div className="product-card__button-container">
        <Button className="button" type="button" text="В корзину" onClick={(): void => {}} />
      </div>
    </div>
  );
};

export default SwiperCard;
