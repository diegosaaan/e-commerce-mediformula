import React, { ReactElement } from 'react';
import '@/pages/Main/components/intro-section/Intro.scss';
import '@/pages/App.scss';
import { Link } from 'react-router-dom';
import IntroCard from './IntroCard';
import PromoCodes from './PromoCodes';
import imagePath from '@/assets/images/png/intro-image-banner.png';
import svgShieldPath from '@/assets/images/svg/intro-card-shield.svg';
import svgLikePath from '@/assets/images/svg/intro-card-like.svg';
import svgHandsShieldPath from '@/assets/images/svg/intro-card-hands-shield.svg';
import svgCasePath from '@/assets/images/svg/intro-card-case.svg';

const Intro = (): ReactElement => {
  return (
    <section className="_container intro">
      <div className="intro__banner-container">
        <div className="intro__banner">
          <div className="intro__banner-left-side">
            <div className="intro__banner-promo-container">
              <p className="intro__promo-text">Акция действует до 31 декабря 2023</p>
              <p className="intro__banner-text">Скидка на массажную накидку ArhMed до 10%</p>
            </div>
            <PromoCodes className="intro__promo-code-container" />
          </div>
          <Link to="/catalog/97c54540-22c2-49a3-9f7c-87b0603975bd" className="intro__image-container">
            <img className="intro__image" src={`${imagePath}`} alt="Intro image" />
          </Link>
        </div>
      </div>
      <PromoCodes className="intro__promo-code-container--mobile" />
      <div className="intro__cards-block">
        <IntroCard
          header="Надежность"
          iconPath={svgShieldPath}
          text="Мы продаем только ту технику, в которой уверены сами."
          label="Только сертифицированное оборудование"
        />
        <IntroCard
          header="Экспертность"
          iconPath={svgLikePath}
          text="Мы можем обеспечить лучшую цену на рынке. "
          label="Поставки от Калининграда до Владивостока"
        />
        <IntroCard
          header="Доверие"
          iconPath={svgHandsShieldPath}
          text="Сервис 24/7. Гарантия. Пост гарантия. Обучение."
          label="Более 2000 исполненных государственных контрактов"
        />
        <IntroCard
          header="Опыт"
          iconPath={svgCasePath}
          text="20 лет работы на рынке. "
          label="500 ведущих производителей медицинского оборудования"
        />
      </div>
    </section>
  );
};

export default Intro;
