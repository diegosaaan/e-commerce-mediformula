import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const PromoCodes = ({ className }: { className: string }): ReactElement => (
  <div className={`${className}`}>
    <div className="intro__cart-link-container">
      <div className="intro__to-cart-arrow"></div>
      <Link className="intro__to-cart-link" to="/cart">
        Корзина
      </Link>
    </div>
    <h2 className="intro__promo-code-heading">Промокоды</h2>
    <ul className="intro__promo-list">
      <li className="intro__promo-list-item">
        <div className="intro__promo-code">3562Y5</div>
        <p className="intro__promo-code-description">Промокод предоставляет скидку 5% на все товары в корзине</p>
      </li>
      <li className="intro__promo-list-item">
        <div className="intro__promo-code">GESS7</div>
        <p className="intro__promo-code-description">
          Промокод предоставляет скидку 10% на все товары категории "Тонометры"
        </p>
      </li>
    </ul>
  </div>
);

export default PromoCodes;
