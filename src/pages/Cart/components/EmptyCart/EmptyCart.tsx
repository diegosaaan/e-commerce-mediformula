import './EmptyCart.scss';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import emptyCartImage from '@/assets/images/png/cart-empty-cart.png';
import useAuth from '@/utils/hooks/useAuth';

const EmptyCart = (): ReactElement => {
  const { isUserLoggedIn } = useAuth();

  return (
    <div className="cart__empty-cart-section">
      <div className="cart__empty-cart-text-block">
        <div className="cart__empty-cart-description-container">
          <p className="cart__empty-cart-description">
            Воспользуйтесь каталогом или поиском, чтобы найти нужный товар.
          </p>
          {!isUserLoggedIn && (
            <p className="cart__empty-cart-description">
              Если в корзине были товары -{' '}
              <Link className="cart__to-login-link" to="/login">
                {' войдите'}
              </Link>
              , чтобы посмотреть список.
            </p>
          )}
        </div>

        <Link to="/catalog" className="cart__to-catalog-link button">
          Каталог
        </Link>
      </div>
      <div className="cart__empty-cart-image-container">
        <img className="cart__empty-cart-image" src={emptyCartImage} alt="empty cart image" />
      </div>
    </div>
  );
};

export default EmptyCart;
