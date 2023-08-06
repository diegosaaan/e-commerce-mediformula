import React, { ReactElement } from 'react';
import '@/pages/Main/components/IntroCard.scss';
import { IPropsIntroCard } from '@/types/interfaces';

const IntroCard = ({ header, iconPath, text, label }: IPropsIntroCard): ReactElement => {
  return (
    <div className="intro-card">
      <div className="intro-card__header-container">
        <h4 className="intro-card__header">{header}</h4>
        <div className="intro-card__icon">
          <img src={iconPath} alt="Icon" />
        </div>
      </div>
      <p className="intro-card__text">{text}</p>
      <div className="intro-card__label-container">
        <hr className="intro-card__line"></hr>
        <p className="intro-card__label">{label}</p>
      </div>
    </div>
  );
};

export default IntroCard;
