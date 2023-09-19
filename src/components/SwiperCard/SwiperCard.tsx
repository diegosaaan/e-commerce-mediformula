import React, { Dispatch, ReactElement, useState } from 'react';
import './SwiperCard.scss';
import { notification } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import { IProductData } from '@/types/apiInterfaces';
import DiscountsID from '@/enums/discountsID';
import { handleAddProduct, handleDeleteProduct } from '@/services/cart';
import useAuth from '@/utils/hooks/useAuth';

interface CardWrapperProps {
  children: ReactElement;
  id: string;
  cb?: (id: string) => void;
}

const CardWrapper = ({ children, id, cb }: CardWrapperProps): ReactElement => {
  const { pathname } = useLocation();

  return pathname === '/' || pathname === '/cart' ? (
    <Link to={`/catalog/${id}`}>{children}</Link>
  ) : (
    <>
      <div
        onClick={(): void => {
          if (cb) {
            cb(id);
          }
        }}
      >
        {children}
      </div>
    </>
  );
};

const SwiperCard = ({
  productData,
  handleCardCliked,
  setIsDataFetching,
}: {
  productData: IProductData;
  handleCardCliked?: ((productId: string) => Promise<void>) | undefined;
  setIsDataFetching: Dispatch<React.SetStateAction<boolean>> | undefined;
}): ReactElement => {
  const { userCart, setUserCart } = useAuth();
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    id,
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

  const handleAddProductInCart = async (): Promise<void> => {
    if (setIsDataFetching) {
      setIsDataFetching(true);
    }

    setIsDisabled(true);
    const result = await handleAddProduct(id);
    if (result) {
      setUserCart(result);
      notification.success({
        message: <p className="auth__notification auth__notification_type_success">Товар добавлен!</p>,
        description: <p className="auth__notification">{`Товар ${productName} успешно добавлен в корзину`}</p>,
      });
      setIsDisabled(false);
    } else {
      setIsDisabled(false);
    }

    if (setIsDataFetching) {
      setIsDataFetching(false);
    }
  };

  const handleDeleteProductInCart = async (): Promise<void> => {
    if (setIsDataFetching) {
      setIsDataFetching(true);
    }

    setIsDisabled(true);
    const artifact = userCart?.lineItems.filter((item) => item.productId === id);
    if (artifact) {
      const result = await handleDeleteProduct(id, artifact[0].quantity);
      if (result) {
        setUserCart(result);
        notification.success({
          message: <p className="auth__notification auth__notification_type_success">Товар удален!</p>,
          description: <p className="auth__notification">{`Товар ${productName} успешно удален из корзины`}</p>,
        });
        setIsDisabled(false);
      } else {
        setIsDisabled(false);
      }
    } else {
      setIsDisabled(false);
    }

    if (setIsDataFetching) {
      setIsDataFetching(false);
    }
  };

  return (
    <div className="product-card">
      <CardWrapper id={id} cb={handleCardCliked}>
        <>
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
              <p className="product-card__price">{`${Math.round(
                discountPrice / 100 || defaultPrice / 100
              ).toLocaleString('ru-RU')} ₽`}</p>
              <p className="product-card__priceBefore">{`${
                discountPrice ? `${Math.round(defaultPrice / 100).toLocaleString('ru-RU')} ₽` : ''
              }`}</p>
            </div>
          </div>
        </>
      </CardWrapper>

      <div className="product-card__button-container">
        <Button
          className={`${
            userCart?.lineItems.some((item) => item.productId === id) ? 'button button_type_primary' : 'button'
          }`}
          type="button"
          text={userCart?.lineItems.some((item) => item.productId === id) ? 'Удалить' : 'В корзину'}
          disabled={isDisabled}
          onClick={(event?: React.MouseEvent<Element, MouseEvent>): void => {
            if (event) {
              event.preventDefault();
            }
            if (userCart) {
              const shouldDelete = userCart.lineItems.some((item) => item.productId === id);
              if (shouldDelete) {
                handleDeleteProductInCart();
              } else {
                handleAddProductInCart();
              }
            } else {
              handleAddProductInCart();
            }
          }}
        />
      </div>
    </div>
  );
};

export default SwiperCard;
