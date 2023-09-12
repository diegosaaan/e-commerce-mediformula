/* eslint-disable @typescript-eslint/no-shadow */
import './InfoCard.scss';
import '@/components/AuthFormSection/AuthFormSection.scss';
import React, { ReactElement, useState, useEffect } from 'react';
import { notification } from 'antd';
import Button from '@/components/Button/Button';
import { ICart } from '@/types/apiInterfaces';
import { addDiscountCode, deleteDiscountCode, getActiveCart } from '@/services/cart';
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
  const [isInitialMount, setIsInitialMount] = useState(true);

  const handleAddPromoCode = async (): Promise<void> => {
    const isUserToken = !!localStorage.getItem('1SortUserToken');
    const updatedCart = await addDiscountCode(cartId, cartVersion, isUserToken, promoCodeInputValue);
    setIsPromoCodeActive(true);
    setUserCart(updatedCart);
    notification.success({
      message: <p className="auth__notification auth__notification_type_success">Промокод добавлен!</p>,
      description: <p className="auth__notification">{`Промокод ${promoCodeInputValue} успешно применен к корзине`}</p>,
    });
  };

  const handleDeletePromoCode = async (): Promise<void> => {
    let currentCart;
    if (localStorage.getItem('1SortUserToken')) {
      const updatedUserCart = await getActiveCart(true);
      currentCart = updatedUserCart;
    } else if (localStorage.getItem('1SortAnonymousToken')) {
      const updatedUserCart = await getActiveCart(false);
      currentCart = updatedUserCart;
    }
    if (currentCart) {
      const isUserToken = !!localStorage.getItem('1SortUserToken');
      const discountCodeID = currentCart.discountCodes[0].discountCode.id;
      const updatedCart = await deleteDiscountCode(currentCart.id, currentCart.version, isUserToken, discountCodeID);
      setIsPromoCodeActive(false);
      setUserCart(updatedCart);
      setFinalCartPrice(updatedCart.totalPrice.centAmount);
      notification.success({
        message: <p className="auth__notification auth__notification_type_success">Промокд удален!</p>,
        description: (
          <p className="auth__notification">{`Промокод ${promoCodeInputValue} успешно удален из корзины`}</p>
        ),
      });
    }
  };

  const setInitialAndFinalCartPrices = async (): Promise<void> => {
    if (discountCodes.length && userCart) {
      const discountCodeID = userCart.discountCodes[0].discountCode.id;
      const isUserToken = !!localStorage.getItem('1SortUserToken');
      const cartWithouthDiscount = await deleteDiscountCode(userCart.id, userCart.version, isUserToken, discountCodeID);
      setInitialCartPrice(cartWithouthDiscount.totalPrice.centAmount);
      setPromoCodeInputValue('3562Y5');

      const currentCart = await addDiscountCode(
        cartWithouthDiscount.id,
        cartWithouthDiscount.version,
        isUserToken,
        '3562Y5'
      );

      setFinalCartPrice(currentCart.totalPrice.centAmount);
      setIsPromoCodeActive(true);
    } else {
      setIsPromoCodeActive(false);
      setInitialCartPrice(cartPrice);
      setFinalCartPrice(cartPrice);
    }
  };

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
    } else {
      setInitialAndFinalCartPrices();
    }
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
            - {Math.round((initialCartPrice - finalCartPrice) / 100).toLocaleString('ru-RU')}₽
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
