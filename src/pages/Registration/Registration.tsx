import React, { ReactElement } from 'react';
import '@/pages/Registration/Registration.scss';
import { Link } from 'react-router-dom';

function RegistrationPage(): ReactElement {
  return (
    <div className="registration-page">
      <h1>Страница регистрации</h1>
      <Link to="/">
        <button>На главную</button>
      </Link>
      <form action="">
        <input type="text" placeholder="Введите имя..." />
        <input type="text" placeholder="Введите фамилию..." />
      </form>
      <p>
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
}

export default RegistrationPage;
