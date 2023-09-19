/* eslint-disable no-empty-pattern */
import React, { Dispatch, ReactElement, useState } from 'react';
import { Popconfirm, notification } from 'antd';
import Button from '@/components/Button/Button';
import './ProductListItem.scss';
import '@/components/AuthFormSection/AuthFormSection.scss';
import { handleAddProduct, handleDeleteProduct } from '@/services/cart';
import useAuth from '@/utils/hooks/useAuth';
import { ILineItem } from '@/types/apiInterfaces';

const ProductListItem = ({
  productData,
  isLoading,
  setIsLoading,
}: {
  productData: ILineItem;
  isLoading: boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}): ReactElement => {
  const {
    productId,
    quantity: productQuantity,
    name: { ru: productName },
    variant: {
      images: [{ url: productURL }],
    },
    price: {
      discounted: productDiscounted,
      value: { centAmount: productCentAmount },
    },
  } = productData;

  const [productCount, setProductCount] = useState(productQuantity);
  const { setUserCart } = useAuth();

  const handleDeleteProductInCart = async (): Promise<void> => {
    setIsLoading(true);
    const result = await handleDeleteProduct(productId, productQuantity);
    if (result) {
      setUserCart(result);
      setIsLoading(false);
      notification.success({
        message: <p className="auth__notification auth__notification_type_success">Товар удален!</p>,
        description: <p className="auth__notification">{`Товар ${productName} успешно удален из корзины`}</p>,
      });
    } else {
      setIsLoading(false);
    }
  };

  const handleAddProductCounter = async (changeAmount: number): Promise<void> => {
    setIsLoading(true);
    const result = await handleAddProduct(productId);
    if (result) {
      setUserCart(result);
      setProductCount((prevValue: number) => prevValue + changeAmount);
    }
  };

  const handleDeleteProductCounter = async (changeAmount: number): Promise<void> => {
    setIsLoading(true);
    const result = await handleDeleteProduct(productId);
    if (result) {
      setUserCart(result);
      setProductCount((prevValue: number) => prevValue + changeAmount);
    }
  };

  return (
    <li className="cart__product-list-item">
      <div className="cart__product-list-item-description">
        <div
          className="cart__product-list-item-image-container"
          style={{ backgroundImage: `url(${productURL})` }}
        ></div>
        <div className="cart__product-list-item-description-text-container">
          <h3 className="cart__product-list-item-heading">{productName}</h3>
          <div className="cart__product-list-item-price-container">
            <div className="cart__product-list-item-current-price cart__product-list-item-current-price--small-font-size">
              {productDiscounted
                ? `${Math.round(productDiscounted.value.centAmount / 100).toLocaleString('ru-RU')} ₽ / шт.`
                : `${Math.round(productCentAmount / 100).toLocaleString('ru-RU')} ₽ / шт.`}
            </div>
            <div className="cart__product-list-item-prev-price cart__product-list-item-prev-price--small-font-size">
              {productData.price.discounted ? `${Math.round(productCentAmount / 100).toLocaleString('ru-RU')} ₽` : ''}
            </div>
          </div>
        </div>
      </div>
      <div className="cart__product-list-item-buttons-container">
        <div className="cart__product-list-item-counter-container">
          <Button
            className="cart__product-list-item-decrease-count"
            type="button"
            onClick={async (): Promise<void> => {
              await handleDeleteProductCounter(-1);
            }}
            disabled={productCount === 1 || isLoading}
          >
            –
          </Button>
          <p className="cart__product-list-item-counter">{productCount}</p>
          <Button
            className="cart__product-list-item-increase-count"
            type="button"
            onClick={async (): Promise<void> => {
              await handleAddProductCounter(1);
            }}
            disabled={isLoading}
          >
            +
          </Button>
        </div>
        <div className="cart__product-list-item-price-container">
          <div className="cart__product-list-item-current-price">
            {productDiscounted
              ? `${Math.round((productDiscounted.value.centAmount / 100) * productQuantity).toLocaleString('ru-RU')} ₽`
              : `${Math.round((productCentAmount / 100) * productQuantity).toLocaleString('ru-RU')} ₽`}
          </div>
          <div className="cart__product-list-item-prev-price">
            {productData.price.discounted
              ? `${Math.round((productCentAmount / 100) * productQuantity).toLocaleString('ru-RU')} ₽`
              : ''}
          </div>
        </div>
        <Popconfirm
          title="Вы уверены, что хотите удалить этот товар?"
          onConfirm={handleDeleteProductInCart}
          okText="Да"
          cancelText="Отмена"
        >
          <Button className="cart__product-list-item-delete-button" type="button" disabled={isLoading} />
        </Popconfirm>
      </div>
    </li>
  );
};

export default ProductListItem;
