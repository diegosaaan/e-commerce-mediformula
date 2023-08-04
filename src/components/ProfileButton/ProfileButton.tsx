import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/components/ProfileButton/ProfileButton.scss';
import Button from '@/components/Button/Button';

const ProfileButton = (): ReactElement => {
  const navigate = useNavigate();
  const handleProfile = (): void => {
    navigate('/user-profile');
  };

  return (
    <>
      <Button className="header__profile-button" type="button" onClick={handleProfile}>
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
