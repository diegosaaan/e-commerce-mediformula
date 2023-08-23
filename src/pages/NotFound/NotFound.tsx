import '@/pages/NotFound/NotFound.scss';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import errorImage from '@/assets/images/svg/not-found-error.svg';

function NotFoundPage(): ReactElement {
  return (
    <div className="not-found-page">
      <section className="not-found _container">
        <div className="not-found__info-container">
          <h2 className="not-found__heading">Ошибка 404</h2>
          <p className="not-found__text">
            К сожалению, такой страницы не найдено. Пожалуйста, вернитесь на главную страницу
          </p>
          <Link to="/" className="not-found__button button">
            На главную
          </Link>
        </div>
        <div className="not-found__error-image-container">
          <img className="not-found__error-image" src={errorImage} alt="404 error image" />
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;
