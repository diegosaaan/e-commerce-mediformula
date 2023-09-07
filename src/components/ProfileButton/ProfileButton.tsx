import React, { ReactElement } from 'react';
import '@/components/ProfileButton/ProfileButton.scss';
import Button from '@/components/Button/Button';

const ProfileButton = (): ReactElement => {
  return (
    <>
      <Button className="header__profile-button" type="button">
        <div className="header__profile-icon"></div>
      </Button>
    </>
  );
};

export default ProfileButton;
