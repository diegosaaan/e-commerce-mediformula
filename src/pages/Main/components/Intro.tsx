import React, { ReactElement } from 'react';
import '@/pages/Main/components/Intro.scss';
import '@/pages/App.scss';
import IntroCard from './IntroCard';
import imagePath from '@/assets/images/png/intro-image.png';
import svgShieldPath from '@/assets/images/svg/intro-card-shield.svg';
import svgLikePath from '@/assets/images/svg/intro-card-like.svg';
import svgHandsShieldPath from '@/assets/images/svg/intro-card-hands-shield.svg';
import svgCasePath from '@/assets/images/svg/intro-card-case.svg';

const Intro = (): ReactElement => {
  return (
    <section className="_container intro">
      <div className="intro__banner">
        <div className="intro__text-container">
          <p className="intro__promo-text">10 000 медицинских товаров с&nbsp;доставкой до 3 дней</p>
          <h1 className="intro__header">Медицинская техника</h1>
        </div>
        <div className="intro__image-container">
          <img className="intro__image" src={`${imagePath}`} alt="Intro image" />
        </div>
      </div>
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
