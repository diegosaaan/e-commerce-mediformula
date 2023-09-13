/* eslint-disable @typescript-eslint/no-shadow */
import './InfoCard.scss';
import '@/components/AuthFormSection/AuthFormSection.scss';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import React, { ReactElement, useState, useEffect, Dispatch } from 'react';
import { notification, Popover } from 'antd';
import Button from '@/components/Button/Button';
import { ICart } from '@/types/apiInterfaces';
import { addDiscountCode, deleteDiscountCode, getActiveCart } from '@/services/cart';
import useAuth from '@/utils/hooks/useAuth';
import handleErrors from '@/utils/helpers/errorHandlers/errorHandlers';
import deliveryDiscountIcon from '@/assets/images/png/cart-delivery-discount.png';

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

const InfoCard = ({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}): ReactElement => {
  const { userCart, setUserCart } = useAuth();
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);

  // const discounts = { everything: '3562Y5', tonometres: 'GESS7' };

  const {
    id: cartId,
    version: cartVersion,
    discountCodes,
    lineItems: productsArray,
    totalPrice: { centAmount: cartPrice },
  } = userCart as ICart;

  const DELIVERY_DISCOUNT_THRESHOLD = 10000;
  const [isDeliveryDiscount, setIsDeliveryDiscount] = useState(cartPrice / 100 > DELIVERY_DISCOUNT_THRESHOLD);
  const [isPromoCodeActive, setIsPromoCodeActive] = useState(!!discountCodes.length);
  const [initialCartPrice, setInitialCartPrice] = useState(cartPrice);
  const [promoCodeInputValue, setPromoCodeInputValue] = useState(localStorage.getItem('promocode') || '');
  const [isInitialMount, setIsInitialMount] = useState(true);

  const content = (
    <p className="auth__notification">
      Внимательно прочитайте условия акции на <a href="/">главной странице</a> и добавьте нужные товары из
      <a href="/catalog"> каталога</a>
    </p>
  );

  const provideInfo = (): void => {
    notification.info({
      message: (
        <p className="auth__notification auth__notification_type_success">В корзине не найдено товаров для скидки</p>
      ),
      description: content,
    });
  };

  const handleAddPromoCode = async (): Promise<void> => {
    setIsLoading(true);
    const isUserToken = !!localStorage.getItem('1SortUserToken');
    localStorage.setItem('promocode', promoCodeInputValue);
    try {
      const updatedCart = await addDiscountCode(cartId, cartVersion, isUserToken, promoCodeInputValue);
      setIsPromoCodeActive(true);
      setUserCart(updatedCart);
      notification.success({
        message: <p className="auth__notification auth__notification_type_success">Промокод добавлен!</p>,
        description: (
          <p className="auth__notification">{`Промокод ${promoCodeInputValue} успешно применен к корзине`}</p>
        ),
      });

      if (cartPrice === updatedCart.totalPrice.centAmount) {
        provideInfo();
      }
      setIsLoading(false);
    } catch (e) {
      const error = e as { response: { data: { statusCode: number; message: string; errors: { code: string }[] } } };
      const {
        response: {
          data: { statusCode, message: errorMessage, errors },
        },
      } = error;
      const code = errors[0]?.code;
      setPromoCodeInputValue('');
      localStorage.removeItem('promocode');
      handleErrors(statusCode, errorMessage, code);
      setIsLoading(false);
    }
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
      setIsLoading(true);
      const isUserToken = !!localStorage.getItem('1SortUserToken');
      const discountCodeID = currentCart.discountCodes[0].discountCode.id;
      localStorage.removeItem('promocode');
      try {
        const updatedCart = await deleteDiscountCode(currentCart.id, currentCart.version, isUserToken, discountCodeID);
        setIsPromoCodeActive(false);
        setUserCart(updatedCart);
        notification.success({
          message: <p className="auth__notification auth__notification_type_success">Промокод удален!</p>,
          description: (
            <p className="auth__notification">{`Промокод ${promoCodeInputValue} успешно удален из корзины`}</p>
          ),
        });
        setIsLoading(false);
      } catch (e) {
        const error = e as { response: { data: { statusCode: number; message: string } } };
        const {
          response: {
            data: { statusCode, message: errorMessage },
          },
        } = error;
        handleErrors(statusCode, errorMessage);
        setIsLoading(false);
      }
    }
  };

  const setInitialAndFinalCartPrices = async (): Promise<void> => {
    if (cartPrice / 100 > DELIVERY_DISCOUNT_THRESHOLD) {
      setIsDeliveryDiscount(true);
    } else {
      setIsDeliveryDiscount(false);
    }

    if (discountCodes.length && userCart) {
      const discountCodeID = userCart.discountCodes[0].discountCode.id;
      const isUserToken = !!localStorage.getItem('1SortUserToken');
      const cartWithouthDiscount = await deleteDiscountCode(userCart.id, userCart.version, isUserToken, discountCodeID);
      setInitialCartPrice(cartWithouthDiscount.totalPrice.centAmount);
      await addDiscountCode(cartWithouthDiscount.id, cartWithouthDiscount.version, isUserToken, promoCodeInputValue);
      setIsPromoCodeActive(true);
    } else {
      setInitialCartPrice(cartPrice);
      setIsPromoCodeActive(false);
    }
  };

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
    } else {
      (async (): Promise<void> => {
        setIsLoadingPrice(true);
        try {
          await setInitialAndFinalCartPrices();
          setIsLoadingPrice(false);
        } catch (e) {
          const error = e as { response: { data: { statusCode: number; message: string } } };
          const {
            response: {
              data: { statusCode, message: errorMessage },
            },
          } = error;
          handleErrors(statusCode, errorMessage);
          setIsLoadingPrice(false);
        }
      })();
    }
  }, [userCart]);

  return (
    <div className={`cart__info-card-container ${isLoading ? 'cart__info-card-container_type_loading' : ''}`}>
      <div className="cart__info-card">
        <div className="cart__info-card-products-info">
          <div className="cart__info-card-products-count">
            {declensionOfTheWordCommodity(productsArray.reduce((acc, item) => acc + item.quantity, 0))}
          </div>
          <div
            className={`cart__info-card-products-price ${
              isLoadingPrice ? 'cart__info-card-products-price_type_loading' : ''
            }`}
          >
            {Math.round(initialCartPrice / 100).toLocaleString('ru-RU')} ₽
          </div>
        </div>

        <div className="cart__info-card-discount-info-container">
          {!isDeliveryDiscount ? (
            <div className={`cart__info-card-discount-info `}>
              <div className="cart__info-card-products-discount-name">Доставка</div>
              <div
                className={`cart__info-card-products-absolute-discount ${
                  isLoadingPrice ? 'cart__info-card-products-absolute-discount_type_loading' : ''
                }`}
              >
                + 500 ₽
              </div>
            </div>
          ) : (
            <div
              className={`cart__info-card-discount-info ${
                !isDeliveryDiscount ? 'cart__info-card-discount-info--hidden' : ''
              }`}
            >
              <div className="cart__info-card-products-discount-name">Доставка</div>
              <div
                className={`cart__info-card-products-absolute-discount ${
                  isLoadingPrice ? 'cart__info-card-products-absolute-discount_type_loading' : ''
                }`}
              >
                бесплатно
              </div>
            </div>
          )}
          <div
            className={`cart__info-card-discount-info ${
              !isPromoCodeActive ? 'cart__info-card-discount-info--hidden' : ''
            }`}
          >
            <div className="cart__info-card-products-discount-name">{`Промокод ${promoCodeInputValue}`}</div>
            <div
              className={`cart__info-card-products-absolute-discount ${
                isLoadingPrice ? 'cart__info-card-products-absolute-discount_type_loading' : ''
              }`}
            >
              {Math.round((initialCartPrice - cartPrice) / 100) ? (
                `- ${Math.round((initialCartPrice - cartPrice) / 100).toLocaleString('ru-RU')} ₽`
              ) : (
                <>
                  {Math.round((initialCartPrice - cartPrice) / 100).toLocaleString('ru-RU')} ₽
                  <Popover content={content} title="Скидка отсутствует" overlayStyle={{ maxWidth: '300px' }}>
                    <button
                      className={`cart__info-card-products-help-icon ${
                        isLoadingPrice ? 'cart__info-card-products-help-icon_type_loading' : ''
                      }`}
                      onClick={provideInfo}
                    ></button>
                  </Popover>
                </>
              )}
            </div>
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
              <Button
                className="cart__info-card-use-promo-code-button"
                type="button"
                onClick={handleAddPromoCode}
                disabled={promoCodeInputValue === ''}
              >
                Применить
              </Button>
            </>
          ) : (
            <>
              <div className="cart__info-card-used-promo-code">{promoCodeInputValue}</div>
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
          <div
            className={`cart__info-card-products-final-price ${
              isLoadingPrice ? 'cart__info-card-products-final-price_type_loading' : ''
            }`}
          >
            {(Math.round(cartPrice / 100) + (isDeliveryDiscount ? 0 : 500)).toLocaleString('ru-RU')} ₽
          </div>
        </div>
        <Button className="cart__info-card-products-order-button button" type="button">
          Перейти к оформлению
        </Button>
      </div>
      <div className="cart__info-card-delivery-discount-container">
        <div className="cart__info-card-circle-progressbar-container">
          <CircularProgressbarWithChildren
            value={(Math.round(cartPrice / 100) / 10000) * 100}
            strokeWidth={6}
            styles={buildStyles({
              pathColor: `#1ED498`,
              trailColor: '#E0E4EB',
            })}
          >
            <div className="cart__info-card-delivery-icon-container">
              <img className="cart__info-card-delivery-icon" src={deliveryDiscountIcon} alt="delivery car icon" />
            </div>
          </CircularProgressbarWithChildren>
        </div>
        {!isDeliveryDiscount ? (
          <p className="cart__info-card-delivery-discount-description">
            До бесплатной доставки{' '}
            <span className="cart__info-card-delivery-discount-value">
              {(DELIVERY_DISCOUNT_THRESHOLD - Math.round(cartPrice / 100)).toLocaleString('ru-RU')} ₽
            </span>
          </p>
        ) : (
          <p className="cart__info-card-delivery-discount-description cart__info-card-delivery-discount-description-apply">
            Бесплатная доставка
          </p>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
