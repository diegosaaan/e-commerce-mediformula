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
  setIsLoading,
}: {
  productData: ILineItem;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}): ReactElement => {
  const [productCount, setProductCount] = useState(productData.quantity);
  const { setUserCart } = useAuth();

  const handleDeleteProductInCart = async (): Promise<void> => {
    setIsLoading(true);
    const result = await handleDeleteProduct(productData.productId, productData.quantity);
    if (result) {
      setUserCart(result);
      setIsLoading(false);
      notification.success({
        message: <p className="auth__notification auth__notification_type_success">Товар удален!</p>,
        description: <p className="auth__notification">{`Товар ${productData.name.ru} успешно удален из корзины`}</p>,
      });
    } else {
      setIsLoading(false);
    }
  };

  const handleAddProductCounter = async (changeAmount: number): Promise<void> => {
    setIsLoading(true);
    const result = await handleAddProduct(productData.productId);
    if (result) {
      setUserCart(result);
      setIsLoading(false);
      setProductCount((prevValue: number) => prevValue + changeAmount);
    } else {
      setIsLoading(false);
    }
  };

  const handleDeleteProductCounter = async (changeAmount: number): Promise<void> => {
    setIsLoading(true);
    const result = await handleDeleteProduct(productData.productId);
    if (result) {
      setUserCart(result);
      setIsLoading(false);
      setProductCount((prevValue: number) => prevValue + changeAmount);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <li className="cart__product-list-item">
      <div className="cart__product-list-item-description">
        <div
          className="cart__product-list-item-image-container"
          style={{ backgroundImage: `url(${productData.variant.images[0].url})` }}
        ></div>
        <h3 className="cart__product-list-item-heading">{productData.name.ru}</h3>
      </div>
      <div className="cart__product-list-item-buttons-container">
        <div className="cart__product-list-item-counter-container">
          <Button
            className="cart__product-list-item-decrease-count"
            type="button"
            onClick={async (): Promise<void> => {
              await handleDeleteProductCounter(-1);
            }}
            disabled={productCount === 1}
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
          >
            +
          </Button>
        </div>
        <div className="cart__product-list-item-price-container">
          <div className="cart__product-list-item-current-price">
            {productData.price.discounted
              ? `${Math.round(
                  (productData.price.discounted.value.centAmount / 100) * productData.quantity
                ).toLocaleString('ru-RU')}₽`
              : `${Math.round((productData.price.value.centAmount / 100) * productData.quantity).toLocaleString(
                  'ru-RU'
                )}₽`}
          </div>
          <div className="cart__product-list-item-prev-price">
            {productData.price.discounted
              ? `${Math.round((productData.price.value.centAmount / 100) * productData.quantity).toLocaleString(
                  'ru-RU'
                )}₽`
              : ''}
          </div>
        </div>
        <Popconfirm
          title="Вы уверены, что хотите удалить этот товар?"
          onConfirm={handleDeleteProductInCart}
          okText="Да"
          cancelText="Отмена"
        >
          <Button className="cart__product-list-item-delete-button" type="button" />
        </Popconfirm>
      </div>
    </li>
  );
};

export default ProductListItem;
