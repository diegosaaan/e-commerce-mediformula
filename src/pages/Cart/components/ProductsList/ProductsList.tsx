import React, { ReactElement } from 'react';
import './ProductsList.scss';
import Button from '@/components/Button/Button';
import ProductListItem from '../ProductListItem.tsx/ProductListItem';
import { IProductList } from '@/types/apiInterfaces';

const ProductsList = ({ cart }: IProductList): ReactElement => {
  return (
    <section className="cart__product-list-container">
      <header className="cart__product-list-header">
        <Button className="cart__product-list-header-clear-btn" type="button">
          Очистить корзину
        </Button>
      </header>
      <ul className="cart__product-list">
        {cart.lineItems.map((product, index) => (
          <ProductListItem productData={product} key={index} />
        ))}
        {/* <ProductListItem />
        <ProductListItem />
        <ProductListItem />
        <ProductListItem /> */}
      </ul>
    </section>
  );
};

export default ProductsList;
