/* eslint-disable @typescript-eslint/no-shadow */
import './InfoCard.scss';
import React, { ReactElement, useState, useEffect } from 'react';
import Button from '@/components/Button/Button';
import { ICart } from '@/types/apiInterfaces';
import { addDiscountCode, deleteDiscountCode } from '@/services/cart';
import useAuth from '@/utils/hooks/useAuth';

const declensionOfTheWordCommodity = (quantity: number): string => {
  const remainder10 = quantity % 10;
  const remainder100 = quantity % 100;

  if (remainder10 === 1 && remainder100 !== 11) {
    return `${quantity} товар`;
  }

  if (remainder10 >= 2 && remainder10 <= 4 && !(remainder100 >= 12 && remainder100 <= 14)) {
    return `${quantity} товара`;
  }

  return `${quantity} товаров`;
};

const InfoCard = (): ReactElement => {
  const { userCart, setUserCart } = useAuth();

  const {
    id: cartId,
    version: cartVersion,
    discountCodes,
    lineItems: productsArray,
    totalPrice: { centAmount: cartPrice },
  } = userCart as ICart;

  const [isPromoCodeActive, setIsPromoCodeActive] = useState(!!discountCodes.length);
  const [initialCartPrice, setInitialCartPrice] = useState(cartPrice);
  const [promoCodeInputValue, setPromoCodeInputValue] = useState('');

  const handleAddPromoCode = async (): Promise<void> => {
    const isUserToken = !!localStorage.getItem('1SortUserToken');
    const updatedCart = await addDiscountCode(cartId, cartVersion, isUserToken, promoCodeInputValue);
    setIsPromoCodeActive(true);
    setUserCart(updatedCart);
  };

  const handleDeletePromoCode = async (): Promise<void> => {
    const isUserToken = !!localStorage.getItem('1SortUserToken');
    const discountCodeID = discountCodes[0].discountCode.id;
    const updatedCart = await deleteDiscountCode(cartId, cartVersion, isUserToken, discountCodeID);
    setIsPromoCodeActive(false);
    setUserCart(updatedCart);
  };

  const setInitialAndFinalCartPrices = async (): Promise<void> => {
    if (discountCodes.length) {
      const absoluteDiscountValue = ((cartPrice / 95) * 5) / 100;
      const prevPrice = absoluteDiscountValue + cartPrice / 100;

      if (prevPrice > absoluteDiscountValue + cartPrice / 100) {
        setInitialCartPrice(Math.floor(prevPrice * 100));
      } else {
        setInitialCartPrice(Math.ceil(prevPrice * 100));
      }

      setPromoCodeInputValue('3562Y5');

      setIsPromoCodeActive(true);
    } else {
      setIsPromoCodeActive(false);
      setInitialCartPrice(cartPrice);
    }
  };

  useEffect(() => {
    setInitialAndFinalCartPrices();
  }, [userCart]);

  return (
    <div className="cart__info-card-container">
      <div className="cart__info-card">
        <div className="cart__info-card-products-info">
          <div className="cart__info-card-products-count">
            {declensionOfTheWordCommodity(productsArray.reduce((acc, item) => acc + item.quantity, 0))}
          </div>
          <div className="cart__info-card-products-price">
            {Math.round(initialCartPrice / 100).toLocaleString('ru-RU')}₽
          </div>
        </div>
        <div
          className={`cart__info-card-discount-info ${
            !isPromoCodeActive ? 'cart__info-card-discount-info--hidden' : ''
          }`}
        >
          <div className="cart__info-card-products-relative-discount">Промокод 3562Y5</div>
          <div className="cart__info-card-products-absolute-discount">
            - {Math.round((initialCartPrice - cartPrice) / 100)}₽
          </div>
        </div>
        <div className="cart__info-card-promo-code-container">
          {!isPromoCodeActive ? (
            <>
              <input
                className="cart__info-card-promo-code-input"
                type="text"
                placeholder="Введите промокод"
                value={promoCodeInputValue}
                onChange={(event): void => setPromoCodeInputValue(event.target.value)}
              />
              <Button className="cart__info-card-use-promo-code-button" type="button" onClick={handleAddPromoCode}>
                Применить
              </Button>
            </>
          ) : (
            <>
              <div className="cart__info-card-used-promo-code">3562Y5</div>
              <Button
                className="cart__info-card-delete-promo-code"
                type="button"
                onClick={handleDeletePromoCode}
              ></Button>
            </>
          )}
        </div>
        <div className="cart__info-card-products-final-price-container">
          <div className="cart__info-card-products-final-price-heading">Итого</div>
          <div className="cart__info-card-products-final-price">
            {Math.round(cartPrice / 100).toLocaleString('ru-RU')}₽
          </div>
        </div>
        <Button className="cart__info-card-products-order-button button" type="button">
          Перейти к оформлению
        </Button>
      </div>
    </div>
  );
};

export default InfoCard;
