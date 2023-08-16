import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import '@/components/AuthForm/AuthForm.scss';
import { IPropsAuthForm } from '@/types/interfaces';
import background1 from '@/assets/images/jpg/auth-background-1.jpg';
import background2 from '@/assets/images/jpg/auth-background-2.jpg';
import background3 from '@/assets/images/jpg/auth-background-3.jpg';
import background4 from '@/assets/images/jpg/auth-background-4.jpg';
import background5 from '@/assets/images/jpg/auth-background-5.jpg';
import background6 from '@/assets/images/jpg/auth-background-6.jpg';

const backgroundImagesPaths = [background1, background2, background3, background4, background5, background6];

export const loader = (): null => {
  backgroundImagesPaths.map((path) => {
    return new Promise<string>((resolve) => {
      const img = new Image();
      img.src = path;

      img.onload = async (): Promise<void> => {
        resolve(path);
      };
    });
  });

  return null;
};

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
  const createRandomIndex = (): number => Math.floor(Math.random() * backgroundImagesPaths.length);

  return (
    <section className="auth" style={{ backgroundImage: `url(${backgroundImagesPaths[createRandomIndex()]})` }}>
      <div className="auth__container">
        <div className="auth__container-heading">
          <h1 className="auth__heading">{title}</h1>
          {isAddAddress && <button className="auth__button-prev" type="button" onClick={handlePrevRegister}></button>}
        </div>
        <form className="auth__form" name={name} onSubmit={onSubmit} autoComplete="off">
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
