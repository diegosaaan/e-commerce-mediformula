import './PageNav.scss';
import React, { FormEvent, ReactElement } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '@/utils/hooks/useAuth';
import logo from '@/assets/images/svg/header-logo.svg';
import ProfileButton from '@/components/ProfileButton/ProfileButton';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Form from '@/components/Form/Form';

export default function PageNav(): ReactElement {
  const { isUserLoggedIn, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = (): void => signOut(() => navigate('/'));
  const handleLogin = (): void => navigate('/login');
  const handleRegister = (): void => navigate('/registration');
  const handleMainPage = (): void => navigate('/');

  const handleExampleClick = (): void => {};
  const handleExampleSumbit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <>
      <nav>
        <ul className="header__nav">
          {!isUserLoggedIn && (
            <li>
              <Button
                className="header__button-nav header__button-nav_type_register"
                type="button"
                onClick={handleRegister}
                text="Регистрация"
              />
            </li>
          )}
          {!isUserLoggedIn && (
            <li>
              <Button
                className="header__button-nav header__button-nav_type_login"
                type="button"
                onClick={handleLogin}
                text="Логин"
              />
            </li>
          )}
          {isUserLoggedIn && (
            <li>
              <Button
                className="header__button-nav header__button-nav_type_login"
                type="button"
                onClick={handleLogOut}
                text="Выйти"
              />
            </li>
          )}
          <li>
            <ProfileButton />
          </li>
        </ul>
      </nav>

      {/* for mobile */}

      <nav className="header__mobile">
        <ul className="header__nav-mobile">
          <li>
            <NavLink to="/">
              <img className="header__logo-mobile" src={logo} alt="Logo" />
            </NavLink>
          </li>
          <ul className="header__nav-container header__nav-container_type_mobile">
            {!isUserLoggedIn && (
              <li>
                <Button
                  className="header__link header__link_type_register"
                  type="button"
                  onClick={handleRegister}
                  text="Регистрация"
                />
              </li>
            )}
            {!isUserLoggedIn && (
              <li>
                <Button
                  className="header__link header__link_type_login"
                  type="button"
                  onClick={handleLogin}
                  text="Логин"
                />
              </li>
            )}
            {isUserLoggedIn && (
              <li>
                <Button
                  className="header__link header__link_type_login"
                  type="button"
                  onClick={handleLogOut}
                  text="Выйти"
                />
              </li>
            )}
          </ul>
        </ul>
        <Form className="header__form-search" name="form-search" onSubmit={handleExampleSumbit}>
          <Input
            className="header__input-search-mobile"
            name="header-search"
            type="search"
            placeholder="Поиск оборудования"
            onChange={handleExampleClick}
          />
          <Button className="header__button-search" type="submit" />
        </Form>
      </nav>

      <nav>
        <ul className="header__nav-extra">
          <ul className="header__nav-container">
            <li>
              <NavLink to="/">
                <img className="header__logo" src={logo} alt="Logo" />
              </NavLink>
            </li>
            <li>
              <Button className="header__button-main" type="button" onClick={handleExampleClick} text="О нас" />
            </li>
            <li>
              <Button className="header__button-main" type="button" onClick={handleExampleClick}>
                <div className="header__button-catalog">
                  <div className="header__button-catalog-icon"></div>
                  <p className="header__button-catalog-text">Каталог</p>
                </div>
              </Button>
            </li>
          </ul>
          <ul className="header__nav-container">
            <li>
              <Form className="header__form-search" name="form-search" onSubmit={handleExampleSumbit}>
                <Input
                  className="header__input-search"
                  name="header-search"
                  type="search"
                  placeholder="Поиск оборудования"
                  onChange={handleExampleClick}
                />
                <Button className="header__button-search" type="submit" />
              </Form>
            </li>
            <li>
              <Button className="header__button-cart" type="button" onClick={handleExampleClick}>
                <p className="header__button-cart-text">3</p>
              </Button>
            </li>
          </ul>
        </ul>
      </nav>

      {/* for mobile */}

      <nav>
        <ul className="header__nav-extra-mobile">
          <li>
            <Button className="header__button-main-mobile" type="button" onClick={handleMainPage}>
              <div className="header__button-icon-mobile header__button-icon-mobile_type_main"></div>
              <p className="header__button-text-mobile">Главная</p>
            </Button>
          </li>
          <li>
            <Button className="header__button-main-mobile" type="button" onClick={handleExampleClick}>
              <div className="header__button-icon-mobile header__button-icon-mobile_type_about"></div>
              <p className="header__button-text-mobile">О нас</p>
            </Button>
          </li>
          <li>
            <Button className="header__button-main-mobile" type="button" onClick={handleExampleClick}>
              <div className="header__button-icon-mobile header__button-catalog-icon-mobile_type_catalogue"></div>
              <p className="header__button-text-mobile">Каталог</p>
            </Button>
          </li>
          <li>
            <Button
              className="header__button-main-mobile header__button-main-mobile_type_cart"
              type="button"
              onClick={handleExampleClick}
            >
              <div className="header__button-icon-mobile header__button-cart-icon-mobile_type_cart"></div>
              <p className="header__button-text-mobile">Корзина</p>
              <p className="header__button-cart-text header__button-cart-text_type_mobile">3</p>
            </Button>
          </li>
          <li>
            <Button className="header__button-main-mobile" type="button" onClick={handleExampleClick}>
              <div className="header__button-icon-mobile header__button-cart-icon-mobile_type_profile"></div>
              <p className="header__button-text-mobile">Профиль</p>
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
}
