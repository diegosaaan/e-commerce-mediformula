import './UserProfile.scss';
import React, { ReactElement, useState } from 'react';
import useAuth from '@/utils/hooks/useAuth';
import CirclePreloader from '@/components/Preloaders/CirclePreloader/CirclePreloader';
import userProfileSectionsData from './userProfileSectionsData';

const UserProfilePage = (): ReactElement => {
  const { userInfo, isContentLoadedPageUserInfo } = useAuth();
  const [activeSection, setActiveSection] = useState('userData');

  const handleClickSection = (sectionId: string): void => {
    setActiveSection(sectionId);
  };

  return isContentLoadedPageUserInfo ? (
    <CirclePreloader pageClassname="user-profile" />
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
                {userProfileSectionsData.map((section) => (
                  <li key={section.id}>
                    <button
                      className={`profile__subcategory ${
                        activeSection === section.id ? 'profile__subcategory_active' : ''
                      }`}
                      type="button"
                      onClick={(): void => handleClickSection(section.id)}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        {userProfileSectionsData.map((section) => (
          <div className="profile__main" key={section.id}>
            {activeSection === section.id && section.component}
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserProfilePage;
