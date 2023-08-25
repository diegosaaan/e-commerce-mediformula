import '@/pages/NotFound/NotFound.scss';
import React, { ReactElement } from 'react';
import useAuth from '@/utils/hooks/useAuth';
import LayoutPreloader from '@/utils/helpers/Loader/LayoutPreloader/LayoutPreloader';

const UserProfilePage = (): ReactElement => {
  const { userInfo, isContentLoadedPageUserInfo } = useAuth();

  return isContentLoadedPageUserInfo ? (
    <LayoutPreloader />
  ) : (
    <div className="user-profile-page">
      <h1 style={{ textAlign: 'center' }}>Личный кабинет (в разработке)</h1>
      {userInfo ? (
        <>
          <p>{userInfo.id}</p>
          <p>{userInfo.email}</p>
          <p>{userInfo.firstName}</p>
          <p>{userInfo.lastName}</p>
          <p>{userInfo.dateOfBirth}</p>
        </>
      ) : (
        <p>Пользователь не авторизован</p>
      )}
    </div>
  );
};

export default UserProfilePage;
