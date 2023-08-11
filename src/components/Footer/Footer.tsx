import React, { ReactElement, useState } from 'react';
import '@/components/Footer/Footer.scss';
import { Link } from 'react-router-dom';
import YandexMap from './YandexMap';
import Accordion from '../Accordion/Accrodion';
import { accordionListData, socialIconsListData } from './linksData';

const Footer = (): ReactElement => {
  const [activeAccordion, setActiveAccordion] = useState('');

  const handleToogleAccordion = (listName: string): void => {
    setActiveAccordion((prevActiveAccordion) => (prevActiveAccordion === listName ? '' : listName));
  };

  return (
    <footer className="footer">
      <div className="_container footer__container">
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

            <div className="footer__accordion-container">
              {accordionListData.map(({ listName, title, items }) => (
                <Accordion
                  key={listName}
                  sectionName="footer"
                  listName={listName}
                  title={title}
                  isOpen={activeAccordion === listName}
                  onToogleAccordion={(): void => handleToogleAccordion(listName)}
                >
                  {items.map(({ label, link, key }) => (
                    <li key={key} className={`footer__${listName}-list-item`}>
                      <a className={`footer__${listName}-list-link`} href={link} target="_blank">
                        {label}
                      </a>
                    </li>
                  ))}
                </Accordion>
              ))}
            </div>
          </div>
          <div className="footer__social-networks">
            <p className="footer__social-networks-heading">Мы в социальных сетях</p>
            <ul className="footer__icon-list">
              {socialIconsListData.map(({ className, href, key }) => (
                <li key={key} className="footer__icon-list-item">
                  <a className={`footer__icon-list-link ${className}`} href={href} target="_blank"></a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer__map-container">
          <div className="footer__label-map-container">
            <p className="footer__map-heading">Мы на карте</p>
            <div className="footer__map-label-icon"></div>
          </div>
          <div className="footer__map">
            <YandexMap />
          </div>
        </div>
        <ul className="footer__legal-list-info">
          <li className="footer__legal-list-info-item">© Все права защищены 2023</li>
          <li className="footer__legal-list-info-item">
            <a className="footer__legal-list-info-link" href="#" target="_blank">
              Политика конфиденциальности
            </a>
          </li>
          <li className="footer__legal-list-info-item">
            <Link className="footer__legal-list-info-link" to="/abouts-us">
              О разработчиках сайта
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
