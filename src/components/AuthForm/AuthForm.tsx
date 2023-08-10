import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '@/components/AuthForm/AuthForm.scss';
import { IPropsAuthForm } from '@/types/interfaces';
import backgroundOne from '@/assets/images/jpg/auth-background-1.jpg';
import backgroundTwo from '@/assets/images/jpg/auth-background-2.jpg';
import backgroundThree from '@/assets/images/jpg/auth-background-3.jpg';
import backgroundFour from '@/assets/images/jpg/auth-background-4.jpg';
import backgroundFive from '@/assets/images/jpg/auth-background-5.jpg';
import backgroundSix from '@/assets/images/jpg/auth-background-6.jpg';

const AuthForm = ({
  onSubmit,
  children,
  name,
  text,
  textLink,
  textButton,
  path,
  title,
  disabled,
  isAddAddress,
  handlePrevRegister,
}: IPropsAuthForm): ReactElement => {
  const [background, setBackground] = useState('');

  useEffect(() => {
    const backgrounds = [backgroundOne, backgroundTwo, backgroundThree, backgroundFour, backgroundFive, backgroundSix];
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setBackground(backgrounds[randomIndex]);
  }, []);

  return (
    <section className="auth">
      <img className="auth__background" src={background} alt="background"></img>
      <div className="auth__container">
        <div className="auth__container-heading">
          <h1 className="auth__heading">{title}</h1>
          {isAddAddress && <button className="auth__button-prev" type="button" onClick={handlePrevRegister}></button>}
        </div>
        <form className="auth__form" name={name} onSubmit={onSubmit}>
          {children}
          {!isAddAddress && (
            <button className="auth__button" type="submit" disabled={disabled}>
              {textButton}
            </button>
          )}
          <p className="auth__text">{text}</p>
          <div className="auth__container-link">
            <Link className="auth__link" to={path}>
              {textLink}
            </Link>
            <div className="auth__arrow"></div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
