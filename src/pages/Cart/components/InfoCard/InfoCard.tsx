import React, { ReactElement } from 'react';
import Button from '@/components/Button/Button';
import './InfoCard.scss';

const InfoCard = (): ReactElement => {
  return (
    <div className="cart__info-card-container">
      <div className="cart__info-card">
        <div className="cart__info-card-products-info">
          <div className="cart__info-card-products-count">4 товара</div>
          <div className="cart__info-card-products-price">10 507₽</div>
        </div>
        <div className="cart__info-card-discount-info">
          <div className="cart__info-card-products-relative-discount">Скидка 5%</div>
          <div className="cart__info-card-products-absolute-discount">- 500₽</div>
        </div>
        <div className="cart__info-card-products-final-price-container">
          <div className="cart__info-card-products-final-price-heading">Итого</div>
          <div className="cart__info-card-products-final-price">10 869₽</div>
        </div>
        <Button className="cart__info-card-products-order-button button" type="button">
          Перейти к оформлению
        </Button>
      </div>
    </div>
  );
};

export default InfoCard;
