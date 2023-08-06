import React, { ReactElement, useState } from 'react';
import '@/components/Footer/Footer.scss';
import { Link } from 'react-router-dom';
import YandexMap from './YandexMap';
import Accordion from '../Accordion/Accrodion';

const Footer = (): ReactElement => {
  const [activeAccordion, setActiveAccordion] = useState('');

  const handleToogleAccordion = (event: React.KeyboardEvent | React.MouseEvent, listName: string): void => {
    if ('key' in event.nativeEvent && event.nativeEvent.key === 'Enter') {
      setActiveAccordion((prevActiveAccordion) => (prevActiveAccordion === listName ? '' : listName));
    } else if ('type' in event.nativeEvent && event.nativeEvent.type === 'click') {
      setActiveAccordion((prevActiveAccordion) => (prevActiveAccordion === listName ? '' : listName));
    }
  };

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

            <div className="footer__accordion-container">
              <Accordion
                sectionName="footer"
                listName="delivery"
                title="Доставка и оплата"
                isOpen={activeAccordion === 'delivery'}
                onToogleAccordion={(event: React.KeyboardEvent | React.MouseEvent): void =>
                  handleToogleAccordion(event, 'delivery')
                }
              >
                <>
                  <li className="footer__delivery-list-item">
                    <a
                      tabIndex={activeAccordion === 'delivery' ? 0 : -1}
                      className="footer__delivery-list-link"
                      href=""
                    >
                      Самовывоз
                    </a>
                  </li>
                  <li className="footer__delivery-list-item">
                    <a
                      tabIndex={activeAccordion === 'delivery' ? 0 : -1}
                      className="footer__delivery-list-link"
                      href=""
                    >
                      Доставка курьером
                    </a>
                  </li>
                  <li className="footer__delivery-list-item">
                    <a
                      tabIndex={activeAccordion === 'delivery' ? 0 : -1}
                      className="footer__delivery-list-link"
                      href=""
                    >
                      Доставка транспортной компанией
                    </a>
                  </li>
                  <li className="footer__delivery-list-item">
                    <a
                      tabIndex={activeAccordion === 'delivery' ? 0 : -1}
                      className="footer__delivery-list-link"
                      href=""
                    >
                      Способ оплаты
                    </a>
                  </li>
                </>
              </Accordion>
              <Accordion
                sectionName="footer"
                listName="services"
                title="Гарантия и сервис"
                isOpen={activeAccordion === 'services'}
                onToogleAccordion={(event: React.KeyboardEvent | React.MouseEvent): void =>
                  handleToogleAccordion(event, 'services')
                }
              >
                <>
                  <li className="footer__services-list-item">
                    <a
                      tabIndex={activeAccordion === 'services' ? 0 : -1}
                      className="footer__services-list-link"
                      href=""
                    >
                      Возврат/обмен
                    </a>
                  </li>
                  <li className="footer__services-list-item">
                    <a
                      tabIndex={activeAccordion === 'services' ? 0 : -1}
                      className="footer__services-list-link"
                      href=""
                    >
                      Ремонт и услуги
                    </a>
                  </li>
                  <li className="footer__services-list-item">
                    <a
                      tabIndex={activeAccordion === 'services' ? 0 : -1}
                      className="footer__services-list-link"
                      href=""
                    >
                      Сервисные центры
                    </a>
                  </li>
                  <li className="footer__services-list-item">
                    <a
                      tabIndex={activeAccordion === 'services' ? 0 : -1}
                      className="footer__services-list-link"
                      href=""
                    >
                      Сопровождение обращений
                    </a>
                  </li>
                </>
              </Accordion>
            </div>
          </div>
          <div className="footer__social-networks">
            <p className="footer__social-networks-heading">Мы в социальных сетях</p>
            <ul className="footer__icon-list">
              <li className="footer__icon-list-item">
                <a className="footer__icon-list-link footer__icon-list-link--whatsapp" href=""></a>
              </li>
              <li className="footer__icon-list-item">
                <a className="footer__icon-list-link footer__icon-list-link--classmates" href=""></a>
              </li>
              <li className="footer__icon-list-item">
                <a className="footer__icon-list-link footer__icon-list-link--vk" href=""></a>
              </li>
              <li className="footer__icon-list-item">
                <a className="footer__icon-list-link  footer__icon-list-link--facebook" href=""></a>
              </li>
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
            <a className="footer__legal-list-info-link" href="">
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
