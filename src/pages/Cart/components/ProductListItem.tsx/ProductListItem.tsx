/* eslint-disable no-empty-pattern */
import React, { ReactElement, useState } from 'react';
import { Popconfirm } from 'antd';
import Button from '@/components/Button/Button';
import './ProductListItem.scss';
import { handleAddProduct, handleDeleteProduct } from '@/services/cart';
import useAuth from '@/utils/hooks/useAuth';
import { ILineItem } from '@/types/apiInterfaces';

const ProductListItem = ({ productData }: { productData: ILineItem }): ReactElement => {
  const [productCount, setProductCount] = useState(productData.quantity);
  const { setUserCart } = useAuth();

  const handleDeleteProductInCart = async (): Promise<void> => {
    setUserCart(await handleDeleteProduct(productData.productId, productData.quantity));
  };

  const handleAddProductCounter = async (changeAmount: number): Promise<void> => {
    setProductCount((prevValue: number) => prevValue + changeAmount);
    setUserCart(await handleAddProduct(productData.productId));
  };

  const handleDeleteProductCounter = async (changeAmount: number): Promise<void> => {
    setProductCount((prevValue: number) => prevValue + changeAmount);
    setUserCart(await handleDeleteProduct(productData.productId));
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
