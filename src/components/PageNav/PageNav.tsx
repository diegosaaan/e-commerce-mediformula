/* eslint-disable no-nested-ternary */
import React, { FormEvent, ReactElement, KeyboardEvent, ChangeEvent, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import useAuth from '@/utils/hooks/useAuth';
import logo from '@/assets/images/svg/header-logo.svg';
import ProfileButton from '@/components/ProfileButton/ProfileButton';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Form from '@/components/Form/Form';

const setActiveClass = ({ isActive }: { isActive: boolean }): string => {
  const currentPath = window.location.pathname;
  if (isActive && !currentPath.match(/^\/catalog\/[a-zA-Z0-9-]+$/)) {
    return 'header__link header__link--active';
  }
  return 'header__link';
};

const PageNav = (): ReactElement => {
  const { isUserLoggedIn, isContentLoaded, signOut } = useAuth();
  const [searchInputValue, setSearchInputValue] = useState('');
  const location = useLocation();

  const navigate = useNavigate();

  message.config({
    duration: 2,
    maxCount: 1,
  });

  const handleScrollToTop = (): void => {
    window.scrollTo({
      top: 0,
    });
  };

  const handleLogOut = (): void => {
    signOut(() => navigate('/'));
    localStorage.removeItem('1SortUserToken');
    message.info({
      content: 'До встречи!',
    });
  };

  const handleSearchButtonClicked = (): void => {
    if (searchInputValue) {
      if (location.pathname !== '/catalog') {
        navigate('/catalog');
      }
    }
  };

  const handleSearchInputKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      if (target.value) {
        if (location.pathname !== '/catalog') {
          navigate('/catalog');
        }
      }
    }
  };

  const handleExampleSumbit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  const handleChangeSearchInputValue = (event: ChangeEvent): void => {
    const target = event.target as HTMLInputElement;
    setSearchInputValue(target.value || '');
  };

  return (
    <>
      <nav>
        <ul className="header__nav">
          <li className="header__nav-auth-item">
            <ul className="header__nav-container-auth">
              <li className={`header__item-logo-mobile ${isUserLoggedIn ? 'header__item-logo-mobile_type_login' : ''}`}>
                <NavLink className={`header__logo-link ${setActiveClass}`} to="/">
                  <img className="header__logo-mobile" src={logo} alt="Logo" />
                </NavLink>
              </li>
              <li className="header__login-registration-btn-container">
                <div className="header__item-reg">
                  <NavLink className="header__link" to="/registration">
                    <Button
                      className={`header__button-nav header__button-nav_type_register ${
                        isContentLoaded && isUserLoggedIn
                          ? 'header__button-nav_hidden'
                          : !isContentLoaded
                          ? 'header__button-nav-skeleton'
                          : ''
                      }`}
                      type="button"
                      text="Регистрация"
                    />
                  </NavLink>
                </div>
                <div className="header__item-log">
                  <NavLink className="header__link" to="/login">
                    <Button
                      className={`header__button-nav header__button-nav_type_login ${
                        isContentLoaded && isUserLoggedIn
                          ? 'header__button-nav_hidden'
                          : !isContentLoaded
                          ? 'header__button-nav-skeleton'
                          : ''
                      }`}
                      type="button"
                      text="Войти"
                    />
                  </NavLink>
                </div>
              </li>

              {isUserLoggedIn && isContentLoaded && (
                <li className="header__item-log">
                  <NavLink className="header__link" to="/">
                    <Button
                      className="header__button-nav header__button-nav_type_login header__button-nav_type_logout"
                      type="button"
                      onClick={handleLogOut}
                      text="Выйти"
                    />
                  </NavLink>
                </li>
              )}
              {isUserLoggedIn && (
                <li className="header__item-profile">
                  <NavLink className={setActiveClass} to="/user-profile">
                    <ProfileButton />
                  </NavLink>
                </li>
              )}
            </ul>
          </li>

          <li className="header__nav-main-item">
            <ul className="header__nav-container-main">
              <li className="header__item-logo">
                <NavLink className="header__logo-link" to="/">
                  <img className="header__logo" src={logo} alt="Logo" />
                </NavLink>
              </li>
              <li className="header__item-about">
                <NavLink className={setActiveClass} to="/about-us">
                  <Button className="header__button-main" type="button" text="О нас" />
                </NavLink>
              </li>
              <li className="header__item-catalog">
                <NavLink className={setActiveClass} to="/catalog">
                  <Button className="header__button-main" type="button">
                    <div className="header__button-catalog">
                      <div className="header__button-catalog-icon"></div>
                      <p className="header__button-catalog-text">Каталог</p>
                    </div>
                  </Button>
                </NavLink>
              </li>
              <li className="header__item-input-search">
                <Form className="header__form-search" name="form-search" onSubmit={handleExampleSumbit}>
                  <Input
                    className="header__input-search"
                    name="header-search"
                    type="search"
                    placeholder="Поиск оборудования"
                    value={searchInputValue}
                    onChange={handleChangeSearchInputValue}
                    onKeyDown={(event): void => handleSearchInputKeyDown(event)}
                  />
                  <Button className="header__button-search" type="submit" onClick={handleSearchButtonClicked} />
                </Form>
              </li>
              <li className="header__item-cart">
                <NavLink className={setActiveClass} to="/cart">
                  <Button className="header__button-cart" type="button">
                    <p className="header__button-cart-text">3</p>
                  </Button>
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* for mobile */}

      <nav>
        <ul className="header__nav-extra-mobile">
          <li>
            <NavLink to="/" className={setActiveClass}>
              <Button onClick={handleScrollToTop} className="header__button-main-mobile" type="button">
                <div className="header__button-icon-mobile header__button-icon-mobile_type_main"></div>
                <p className="header__button-text-mobile">Главная</p>
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about-us" className={setActiveClass}>
              <Button onClick={handleScrollToTop} className="header__button-main-mobile" type="button">
                <div className="header__button-icon-mobile header__button-icon-mobile_type_about"></div>
                <p className="header__button-text-mobile">О нас</p>
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalog" className={setActiveClass}>
              <Button onClick={handleScrollToTop} className="header__button-main-mobile" type="button">
                <div className="header__button-icon-mobile header__button-catalog-icon-mobile_type_catalogue"></div>
                <p className="header__button-text-mobile">Каталог</p>
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={setActiveClass}>
              <Button
                onClick={handleScrollToTop}
                className="header__button-main-mobile header__button-main-mobile_type_cart"
                type="button"
              >
                <div className="header__button-icon-mobile header__button-cart-icon-mobile_type_cart"></div>
                <p className="header__button-text-mobile">Корзина</p>
                <p className="header__button-cart-text header__button-cart-text_type_mobile">3</p>
              </Button>
            </NavLink>
          </li>
          {isUserLoggedIn && (
            <li>
              <NavLink to="/user-profile" className={setActiveClass}>
                <Button onClick={handleScrollToTop} className="header__button-main-mobile" type="button">
                  <div className="header__button-icon-mobile header__button-cart-icon-mobile_type_profile"></div>
                  <p className="header__button-text-mobile">Профиль</p>
                </Button>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default PageNav;
