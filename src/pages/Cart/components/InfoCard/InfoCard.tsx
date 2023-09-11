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
  const [finalCartPrice, setFinalCartPrice] = useState(cartPrice);
  const [promoCodeInputValue, setPromoCodeInputValue] = useState('');

  const productQuantity = productsArray.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddPromoCode = async (): Promise<void> => {
    const isUserToken = !!localStorage.getItem('1SortUserToken');
    const updatedCart = await addDiscountCode(cartId, cartVersion, isUserToken, promoCodeInputValue);
    setIsPromoCodeActive(true);
    setFinalCartPrice(updatedCart.totalPrice.centAmount);
    setUserCart(updatedCart);
    console.log(updatedCart);
  };

  const handleDeletePromoCode = async (): Promise<void> => {
    console.log(userCart?.discountCodes);
    console.log(discountCodes);
    const isUserToken = !!localStorage.getItem('1SortUserToken');
    const discountCodeID = discountCodes[0].discountCode.id;
    const updatedCart = await deleteDiscountCode(cartId, cartVersion, isUserToken, discountCodeID);
    setIsPromoCodeActive(false);
    setUserCart(updatedCart);
    setFinalCartPrice(updatedCart.totalPrice.centAmount);
  };

  const setInitialAndFinalCartPrices = async (discountCodeID: string): Promise<void> => {
    const isUserToken = !!localStorage.getItem('1SortUserToken');
    const cartWithouthDiscount = await deleteDiscountCode(cartId, cartVersion, isUserToken, discountCodeID);
    setInitialCartPrice(cartWithouthDiscount.totalPrice.centAmount);
    setUserCart(cartWithouthDiscount);
    setPromoCodeInputValue('3562Y5');

    const currentCart = await addDiscountCode(
      cartWithouthDiscount.id,
      cartWithouthDiscount.version,
      isUserToken,
      '3562Y5'
    );

    setFinalCartPrice(currentCart.totalPrice.centAmount);
    setIsPromoCodeActive(true);
    setUserCart(currentCart);
  };

  useEffect(() => {
    if (discountCodes.length) {
      const discountCodeID = discountCodes[0].discountCode.id;
      setInitialAndFinalCartPrices(discountCodeID);
    }
  }, [userCart]);

  return (
    <div className="cart__info-card-container">
      <div className="cart__info-card">
        <div className="cart__info-card-products-info">
          <div className="cart__info-card-products-count">{declensionOfTheWordCommodity(productQuantity)}</div>
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
            - {Math.round((initialCartPrice - finalCartPrice) / 100)}₽
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
            {Math.round(finalCartPrice / 100).toLocaleString('ru-RU')}₽
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
