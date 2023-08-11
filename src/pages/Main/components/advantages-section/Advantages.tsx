import './Advantages.scss';
import React, { ReactElement } from 'react';
import ourTeamPhoto from '@/assets/images/png/main-advantages-our-team.png';

const Advantages = (): ReactElement => (
  <section className="advantages">
    <div className="container avantages__container">
      <div className="advantages__leader-card">
        <div className="advantages__leader-card-description">
          <h3 className="advantages__leader-card-heading">Один из лидеров российского рынка</h3>
          <p className="advantages__leader-card-text">
            Мы постоянно работаем над расширением ассортимента, следим за ценами, стремимся создать условия для того,
            чтобы вы могли заказывать все необходимые товары в нашем интернет-магазине.
          </p>
        </div>
        <div className="advantages__leader-card-img-container">
          <img className="advantages__leader-card-img" alt="Our team" src={ourTeamPhoto}></img>
        </div>
        <ul className="advantages__leader-card-list">
          <li className="advantages__leader-card-list-item">
            <p className="advantages__leader-card-list-item-text">
              {'>'} 10 000 сделок
              <span className="advantages__leader-card-list-item-text--gray">с оборотом от 1 млн руб. в месяц</span>
            </p>
          </li>
          <li className="advantages__leader-card-list-item">
            <p className="advantages__leader-card-list-item-text">
              {'>'} 20 лет
              <span className="advantages__leader-card-list-item-text--gray">работы в сфере медтехники</span>
            </p>
          </li>
          <li className="advantages__leader-card-list-item">
            <p className="advantages__leader-card-list-item-text">
              {'>'} 10 000 товаров
              <span className="advantages__leader-card-list-item-text--gray">в наличии и под заказ</span>
            </p>
          </li>
          <li className="advantages__leader-card-list-item">
            <p className="advantages__leader-card-list-item-text">
              {'>'} по всей России
              <span className="advantages__leader-card-list-item-text--gray">бесплатная доставка от 2990 руб.</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default Advantages;
