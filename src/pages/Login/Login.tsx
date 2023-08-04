import '@/pages/Login/Login.scss';
import React, { FormEvent, ReactElement } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/utils/hooks/useAuth';

function LoginPage(): ReactElement {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const goBack = (): void => navigate(-1);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    signIn(() => navigate(fromPage));
  };

  return (
    <div className="login-page">
      <h1>Страница логина</h1>
      <button onClick={goBack}>Вернуться назад</button>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="Введите email..." />
        <input type="text" placeholder="Введите пароль..." />
        <button type="submit">Войти</button>
        <p>
          Еще не зарегистрированы? <Link to="/registration">Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
