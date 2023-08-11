import './Services.scss';
import React, { ReactElement } from 'react';
import brandsData from './brendsData';

const Services = (): ReactElement => (
  <section className="services _container">
    <div className="services__container">
      <div className="services__card">
        <h2 className="services__card-heading services__card-heading--white">
          Комплексное оснащение медицинских кабинетов
        </h2>
        <p className="services__card-text services__card-text--white">
          Оснастите медицинский кабинет всем необходимым в соответствии с регламентом!
        </p>
      </div>
      <div className="services__card">
        <h2 className="services__card-heading">Обеспечиваем гарантийное и сервисное сопровождение</h2>
        <p className="services__card-text">
          Наш сервисный центр имеет сертификацию на проведение диагностики и ремонтного обслуживания техники большого
          количества брендов.
        </p>
        <div className="services__card-list-container">
          <ul className="services__card-brends-list">
            {brandsData.map((brand, index) => (
              <li
                key={index}
                className={`services__card-brends-list-item services__card-brends-list-link-${brand.name}`}
              >
                <a
                  className={`services__card-brends-list-link services__card-brends-list-link-${brand.name}`}
                  href={brand.url}
                  target="_blank"
                ></a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Services;
