import React, { ReactElement } from 'react';
import '@/components/Footer/Footer.scss';
import YandexMap from './YandexMap';
import SocialNetworksCard from './FooterCard/FooterCard';

const Footer = (): ReactElement => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__main-content-container">
          <div className="footer__useful-links">
            <ul className="footer__numbers-list">
              <li className="footer__numbers-list-item">
                <a className="footer__numbers-list-link" href="tel:+8 800 412–95–11">
                  8 800 412–95–11
                </a>
                <p className="footer__numbers-list-city">Бесплатно по России</p>
              </li>
              <li className="footer__numbers-list-item">
                <a className="footer__numbers-list-link" href="tel:+8 800 512–42–56">
                  (3852) 57–00–77
                </a>
                <p className="footer__numbers-list-city">Москва</p>
              </li>
            </ul>
            <div className="footer__list-container">
              <ul className="footer__delivery-list">
                <li className="footer__delivery-list-item">
                  <h6 className="footer__list-heading">Доставка и оплата</h6>
                </li>
                <li className="footer__delivery-list-item">Самовывоз</li>
                <li className="footer__delivery-list-item">Доставка курьером</li>
                <li className="footer__delivery-list-item">Доставка транспортной компанией</li>
                <li className="footer__delivery-list-item">Способ оплаты</li>
              </ul>
              <ul className="footer__services-list">
                <li className="footer__services-list-item">
                  <h6 className="footer__list-heading">Гарантия и сервис</h6>
                </li>
                <li className="footer__services-list-item">Возврат/обмен</li>
                <li className="footer__services-list-item">Ремонт и услуги</li>
                <li className="footer__services-list-item">Сервисные центры</li>
                <li className="footer__services-list-item">Сопровождение обращений</li>
              </ul>
            </div>
          </div>
          <SocialNetworksCard />
        </div>
        <div className="footer__map">
          <YandexMap />
        </div>
        <ul className="footer__legal-list-info">
          <li className="footer__legal-list-info-item">© Все права защищены 2023</li>
          <li className="footer__legal-list-info-item">Политика конфиденциальности</li>
          <li className="footer__legal-list-info-item">О разработчиках сайта</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
