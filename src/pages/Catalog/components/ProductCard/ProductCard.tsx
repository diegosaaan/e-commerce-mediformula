import './ProductCard.scss';
import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IProductData } from '@/types/apiInterfaces';
import DiscountsID from '@/enums/discountsID';
import Button from '@/components/Button/Button';

const ProductCard = ({ product }: { product: IProductData }): ReactElement => {
  const {
    id,
    name: { ru: productName },
    description: { ru: productDescription },
    masterVariant: {
      attributes,
      images: [
        {
          url: imageUrl,
          dimensions: { w: imageWidth, h: imageHeigth },
        },
      ],
      prices: [
        {
          value: { centAmount: defaultPrice },
          discounted,
        },
      ],
    },
  } = product;

  const brand = attributes.filter((attribute) => attribute.name === 'brand')[0].value.ru;

  let discountPrice = 0;
  let discountValue: keyof typeof DiscountsID | string = '';
  if (discounted) {
    discountPrice = discounted.value.centAmount;
    discountValue = `${DiscountsID[`${discounted.discount.id}` as keyof typeof DiscountsID]}`;
  }

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = (): void => {
      setIsImageLoaded(true);
    };
  }, [imageUrl]);

  return (
    <li
      className={`catalog__product-list-item ${
        isImageLoaded ? 'catalog__product-list-item--active' : ' catalog__product-list-item--hidden'
      }`}
    >
      {discountValue && <div className="catalog__product-discount">{discountValue}</div>}
      <Link className="catalog__product-list-route-link" to={`/catalog/${id}`} target="_blank">
        <div className="catalog__product-list-item-container">
          <div className="catalog__product-list-item-left-side">
            <div
              className="catalog__product-list-item-photo-container"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: `${imageHeigth > 222 || imageWidth > 222 ? 'contain' : 'cover'}`,
              }}
            >
              {/* <img className="catalog__product-list-item-photo" src={imageUrl} alt={imageAlt} /> */}
            </div>
            <div className="catalog__product-list-item-description-container">
              <h3 className="catalog__product-list-item-title">{productName}</h3>
              <h4 className="catalog__product-list-item-description-brand">
                Бренд:
                <span className="catalog__product-list-item-description-brand-name">{brand}</span>
              </h4>
              <h4 className="catalog__product-list-item-description-title">Описание:</h4>
              <p className="catalog__product-list-item-description">{productDescription}</p>
            </div>
          </div>
          <div className="catalog__product-list-item-right-side">
            <div className="catalog__product-list-item-price-container">
              <span className="catalog__product-list-item-current-price">
                {discountPrice > 0 ? discountPrice / 100 : defaultPrice / 100} ₽
              </span>
              <span className="catalog__product-list-item-prev-price">
                {discountPrice ? `${defaultPrice / 100} ₽` : ''}
              </span>
            </div>
            <Button type="button" className="button catalog__product-list-item-button">
              В корзину
            </Button>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;
