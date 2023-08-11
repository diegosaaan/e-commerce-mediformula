import '@/pages/Login/Login.scss';
import React, { FormEvent, ReactElement, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/utils/hooks/useAuth';
import AuthInput from '@/components/AuthInput/AuthInput';
import AuthForm from '@/components/AuthForm/AuthForm';

function LoginPage(): ReactElement {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const [infoLogin, setInfoLogin] = useState({
    email: '',
    password: '',
  });

  const handleInfoChange = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setInfoLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
          <AuthInput
            type="email"
            placeholder="Email*"
            name="email"
            htmlFor="email"
            isInputPassword={false}
            onChange={handleInfoChange}
            value={infoLogin.email}
          />
        </li>
        <li>
          <AuthInput
            type="password"
            placeholder="Пароль*"
            name="password"
            htmlFor="password"
            isInputPassword={true}
            onChange={handleInfoChange}
            value={infoLogin.password}
          />
        </li>
      </ul>
    </AuthForm>
  );
}

export default LoginPage;
