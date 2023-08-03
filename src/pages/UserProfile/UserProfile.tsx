import '@/pages/NotFound/NotFound.scss';
import React, { ReactElement } from 'react';
import Header from '@/components/Header/Header';

function UserProfilePage(): ReactElement {
  return (
    <div className="user-profile-page">
      <h1>Личный кабинет</h1>
      <Header />
      <main></main>
    </div>
  );
}

export default UserProfilePage;
