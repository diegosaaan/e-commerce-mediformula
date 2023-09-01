import './UserProfile.scss';
import React, { ReactElement, useState } from 'react';
import useAuth from '@/utils/hooks/useAuth';
import LayoutPreloader from '@/utils/helpers/Loader/LayoutPreloader/LayoutPreloader';
import EditUserData from './components/EditUserData';
import EditAddresses from './components/EditAddresses';
import EditPassword from './components/EditPassword';

const UserProfilePage = (): ReactElement => {
  const { userInfo, isContentLoadedPageUserInfo } = useAuth();
  const [isUserData, setIsUserData] = useState(true);
  const [isEditAddresses, setIsEditAddresses] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);

  const handleClickEditUser = (): void => {
    setIsUserData(true);
    setIsEditAddresses(false);
    setIsEditPassword(false);
  };

  const handleClickEditAddresses = (): void => {
    setIsUserData(false);
    setIsEditAddresses(true);
    setIsEditPassword(false);
  };

  const handleClickEditPassword = (): void => {
    setIsUserData(false);
    setIsEditAddresses(false);
    setIsEditPassword(true);
  };

  return isContentLoadedPageUserInfo ? (
    <LayoutPreloader />
  ) : (
    <section className="profile" aria-label="Профиль">
      <div className="profile__container">
        <div className="profile__info">
          <div className="profile__container-info">
            {userInfo ? (
              <>
                <p className="profile__name">{`${userInfo.firstName} ${userInfo.lastName}`}</p>
                <p className="profile__email">{userInfo.email}</p>
              </>
            ) : (
              <p className="profile__name">Пользователь не авторизован</p>
            )}
          </div>
          <ul className="profile__categories">
            <li className="profile__category">
              <div className="profile__container-icon-name">
                <div className="profile__category-icon profile__category-icon_type_home"></div>
                <p className="profile__category-name">Мой кабинет</p>
              </div>
            </li>
            <li className="profile__category">
              <div className="profile__container-icon-name">
                <div className="profile__category-icon profile__category-icon_type_user"></div>
                <p className="profile__category-name">Профиль</p>
              </div>
              <ul className="profile__subcategories">
                <li>
                  <button
                    className={`profile__subcategory ${isUserData ? 'profile__subcategory_active' : ''}`}
                    type="button"
                    onClick={handleClickEditUser}
                  >
                    Личные данные
                  </button>
                </li>
                <li>
                  <button
                    className={`profile__subcategory ${isEditAddresses ? 'profile__subcategory_active' : ''}`}
                    type="button"
                    onClick={handleClickEditAddresses}
                  >
                    Изменить адреса
                  </button>
                </li>
                <li>
                  <button
                    className={`profile__subcategory ${isEditPassword ? 'profile__subcategory_active' : ''}`}
                    type="button"
                    onClick={handleClickEditPassword}
                  >
                    Изменить пароль
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="profile__main">
          {isUserData && <EditUserData />}
          {isEditAddresses && <EditAddresses />}
          {isEditPassword && <EditPassword />}
        </div>
      </div>
    </section>
  );
};

export default UserProfilePage;
