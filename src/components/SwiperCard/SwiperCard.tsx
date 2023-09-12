import React, { ReactElement } from 'react';
import './SwiperCard.scss';
import { notification } from 'antd';
import Button from '../Button/Button';
import { IProductData } from '@/types/apiInterfaces';
import DiscountsID from '@/enums/discountsID';
import { handleAddProduct, handleDeleteProduct } from '@/services/cart';
import useAuth from '@/utils/hooks/useAuth';

const SwiperCard = ({ productData }: { productData: IProductData }): ReactElement => {
  const { userCart, setUserCart } = useAuth();
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
    const result = await handleAddProduct(id);
    if (result) {
      setUserCart(result);
      notification.success({
        message: <p className="auth__notification auth__notification_type_success">Товар добавлен!</p>,
        description: <p className="auth__notification">{`Товар ${productName} успешно добавлен в корзину`}</p>,
      });
    }
  };

  const handleDeleteProductInCart = async (): Promise<void> => {
    const artifact = userCart?.lineItems.filter((item) => item.productId === id);
    if (artifact) {
      const result = await handleDeleteProduct(id, artifact[0].quantity);
      if (result) {
        setUserCart(result);
        notification.success({
          message: <p className="auth__notification auth__notification_type_success">Товар удален!</p>,
          description: <p className="auth__notification">{`Товар ${productName} успешно удален из корзины`}</p>,
        });
      }
    }
  };

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
        <Button
          className="button"
          type="button"
          text={userCart?.lineItems.some((item) => item.productId === id) ? 'Удалить' : 'В корзину'}
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
            }
          }}
        />
      </div>
    </div>
  );
};

export default SwiperCard;
