import React, { ReactElement } from 'react';
import './ProductsList.scss';
import Button from '@/components/Button/Button';
import ProductListItem from '../ProductListItem.tsx/ProductListItem';
import { ILineItem } from '@/types/apiInterfaces';
import useAuth from '@/utils/hooks/useAuth';

const ProductsList = (): ReactElement => {
  const { userCart } = useAuth();

  return (
    <section className="cart__product-list-container">
      <header className="cart__product-list-header">
        <Button className="cart__product-list-header-clear-btn" type="button">
          Очистить корзину
        </Button>
      </header>
      <ul className="cart__product-list">
        {userCart &&
          userCart.lineItems.map((product: ILineItem) => <ProductListItem productData={product} key={product.id} />)}
      </ul>
    </section>
  );
};

export default ProductsList;
