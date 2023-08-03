import '@/pages/Login/Login.scss';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

function LoginPage(): ReactElement {
  return (
    <div className="login-page">
      <h1>Страница логина</h1>
      <Link to="/">
        <button>На главную</button>
      </Link>
      <form action="">
        <input type="text" placeholder="Введите email..." />
        <input type="text" placeholder="Введите пароль..." />
        <p>
          Еще не зарегистрированы? <Link to="/registration">Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
