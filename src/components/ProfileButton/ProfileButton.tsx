import React, { ReactElement } from 'react';
import '@/components/ProfileButton/ProfileButton.scss';
import Button from '@/components/Button/Button';

const ProfileButton = (): ReactElement => {
  return (
    <>
      <Button className="header__profile-button" type="button">
        <div className="header__profile-icon"></div>
        <div className="header__profile-bonus">
          <div className="header__profile-bonus-icon"></div>
          <p className="header__profile-bonus-price">2 000 ₽</p>
        </div>
      </Button>
    </>
  );
};

export default ProfileButton;
