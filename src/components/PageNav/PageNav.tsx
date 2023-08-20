/* eslint-disable no-nested-ternary */
import './PageNav.scss';
import React, { FormEvent, ReactElement } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import useAuth from '@/utils/hooks/useAuth';
import logo from '@/assets/images/svg/header-logo.svg';
import ProfileButton from '@/components/ProfileButton/ProfileButton';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Form from '@/components/Form/Form';

const setActive = ({ isActive }: { isActive: boolean }): string =>
  isActive ? 'header__link header__link_active' : 'header__link';

const PageNav = (): ReactElement => {
  const { isUserLoggedIn, isContentLoaded, signOut } = useAuth();
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

  const handleExampleSumbit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const handleExampleChange = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
  };

  return (
    <>
      <nav>
        <ul className="header__nav">
          <ul className="header__nav-container-auth">
            <li className={`header__item-logo-mobile ${isUserLoggedIn ? 'header__item-logo-mobile_type_login' : ''}`}>
              <Link className="header__logo-link" to="/">
                <img className="header__logo-mobile" src={logo} alt="Logo" />
              </Link>
            </li>

            <>
              <li className="header__item-reg">
                <Link className="header__link" to="/registration">
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
                </Link>
              </li>
              <li className="header__item-log">
                <Link className="header__link" to="/login">
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
                </Link>
              </li>
            </>
            {isUserLoggedIn && isContentLoaded && (
              <li className="header__item-log">
                <Link className="header__link" to="/">
                  <Button
                    className="header__button-nav header__button-nav_type_login header__button-nav_type_logout"
                    type="button"
                    onClick={handleLogOut}
                    text="Выйти"
                  />
                </Link>
              </li>
            )}
            <li className="header__item-profile">
              <Link className="header__link" to="/user-profile">
                <ProfileButton />
              </Link>
            </li>
          </ul>
          <ul className="header__nav-container-main">
            <li className="header__item-logo">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src={logo} alt="Logo" />
              </Link>
            </li>
            <li className="header__item-about">
              <Link className="header__link" to="/about-us">
                <Button className="header__button-main" type="button" text="О нас" />
              </Link>
            </li>
            <li className="header__item-catalog">
              <Link className="header__link" to="/catalog">
                <Button className="header__button-main" type="button">
                  <div className="header__button-catalog">
                    <div className="header__button-catalog-icon"></div>
                    <p className="header__button-catalog-text">Каталог</p>
                  </div>
                </Button>
              </Link>
            </li>
            <li className="header__item-input-search">
              <Form className="header__form-search" name="form-search" onSubmit={handleExampleSumbit}>
                <Input
                  className="header__input-search"
                  name="header-search"
                  type="search"
                  placeholder="Поиск оборудования"
                  onChange={handleExampleChange}
                />
                <Button className="header__button-search" type="submit" />
              </Form>
            </li>
            <li className="header__item-cart">
              <Link className="header__link" to="/cart">
                <Button className="header__button-cart" type="button">
                  <p className="header__button-cart-text">3</p>
                </Button>
              </Link>
            </li>
          </ul>
        </ul>
      </nav>

      {/* for mobile */}

      <nav>
        <ul className="header__nav-extra-mobile">
          <li>
            <NavLink to="/" className={setActive}>
              <Button onClick={handleScrollToTop} className="header__button-main-mobile" type="button">
                <div className="header__button-icon-mobile header__button-icon-mobile_type_main"></div>
                <p className="header__button-text-mobile">Главная</p>
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about-us" className={setActive}>
              <Button onClick={handleScrollToTop} className="header__button-main-mobile" type="button">
                <div className="header__button-icon-mobile header__button-icon-mobile_type_about"></div>
                <p className="header__button-text-mobile">О нас</p>
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalog" className={setActive}>
              <Button onClick={handleScrollToTop} className="header__button-main-mobile" type="button">
                <div className="header__button-icon-mobile header__button-catalog-icon-mobile_type_catalogue"></div>
                <p className="header__button-text-mobile">Каталог</p>
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={setActive}>
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
          <li>
            <NavLink to="/user-profile" className={setActive}>
              <Button onClick={handleScrollToTop} className="header__button-main-mobile" type="button">
                <div className="header__button-icon-mobile header__button-cart-icon-mobile_type_profile"></div>
                <p className="header__button-text-mobile">Профиль</p>
              </Button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default PageNav;
