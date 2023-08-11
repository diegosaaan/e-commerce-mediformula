import '@/pages/Login/Login.scss';
import React, { FormEvent, ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/utils/hooks/useAuth';
import AuthInput from '@/components/AuthInput/AuthInput';
import AuthForm from '@/components/AuthForm/AuthForm';

function LoginPage(): ReactElement {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    signIn(() => navigate(fromPage));
  };

  return (
    <AuthForm
      onSubmit={handleLogin}
      name="form-login"
      text="Еще не зарегистрированы?"
      textLink="Регистрация"
      textButton="Войти"
      path="/registration"
      title="Вход"
    >
      <ul className="auth__list auth__list_active">
        <li>
          <AuthInput type="email" placeholder="Email*" name="email" htmlFor="email" isInputPassword={false} />
        </li>
        <li>
          <AuthInput type="password" placeholder="Пароль*" name="password" htmlFor="password" isInputPassword={true} />
        </li>
      </ul>
    </AuthForm>
  );
}

export default LoginPage;
