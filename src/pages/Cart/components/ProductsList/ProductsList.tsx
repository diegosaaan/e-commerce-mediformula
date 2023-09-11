import React, { ReactElement } from 'react';
import './ProductsList.scss';
import { Button } from 'antd';
import ProductListItem from '../ProductListItem.tsx/ProductListItem';

const ProductsList = (/* productsData */): ReactElement => {
  return (
    <section className="cart__product-list-container">
      <header className="cart__product-list-header">
        <Button className="cart__product-list-header-clear-btn" type="text">
          Очистить корзину
        </Button>
      </header>
      <ul className="cart__product-list">
        {/* productsData.map((product) => {
          <ProductListItem productData={product}/>
        }) */}
        <ProductListItem />
        <ProductListItem />
        <ProductListItem />
        <ProductListItem />
      </ul>
    </section>
  );
};

export default ProductsList;
