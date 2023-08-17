import '@/pages/Login/Login.scss';
import React, { ReactElement } from 'react';
import { notification, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { LoginSchema } from '@/utils/helpers/validationSchemes';
import useAuth from '@/utils/hooks/useAuth';
import AuthInput from '@/components/AuthInput/AuthInput';
import AuthForm from '@/components/AuthForm/AuthForm';
import { LoginSchemaType } from '@/types/types';
import * as userAuth from '@/services/auth-user';
import exit from '@/assets/images/svg/auth-exit.svg';

const LoginPage = (): ReactElement => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  notification.config({
    maxCount: 5,
    placement: 'bottomLeft',
    duration: 10,
    closeIcon: (
      <span className="ant-notification-close-x">
        <span role="img" aria-label="close" className="anticon anticon-close ant-notification-close-icon">
          <img className="auth__exit-btn" src={exit} alt="close" />
        </span>
      </span>
    ),
  });

  message.config({
    duration: 2,
    maxCount: 1,
  });

  const handleLogin = (values: LoginSchemaType): void => {
    const { email, password } = values;
    userAuth
      .login(email, password)
      .then((res) => {
        console.log(res);
        userAuth
          .getToken(email, password)
          .then((result) => {
            if (result !== null && typeof result === 'object' && 'access_token' in result) {
              const accessToken: string = result.access_token as string;
              console.log(result);
              message.info({
                content: 'Добро пожаловать!',
              });
              signIn(() => navigate('/'));
              localStorage.setItem('token', String(accessToken));
            }
          })
          .catch((err) => console.log(`Возникла ошибка: ${err}`));
      })
      .catch((err) => {
        if (err === 400) {
          notification.error({
            message: <p className="auth__notification auth__notification_type_main">Возникла ошибка!</p>,
            description: <p className="auth__notification">Вы ввели неправильный логин или пароль</p>,
          });
        } else if (err === 500) {
          notification.error({
            message: <p className="auth__notification auth__notification_type_main">Возникла ошибка!</p>,
            description: <p className="auth__notification">500 Ошибка сервера, повторите запрос позднее</p>,
          });
        } else {
          notification.error({
            message: <p className="auth__notification auth__notification_type_main">Возникла ошибка!</p>,
            description: <p className="auth__notification">При авторизации возникла ошибка</p>,
          });
        }
        console.log(`Возникла ошибка: ${err}`);
      });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({ values, errors, touched, handleChange, isValid, dirty }): JSX.Element => (
        <AuthForm
          name="form-login"
          text="Еще не зарегистрированы?"
          textLink="Регистрация"
          textButton="Войти"
          path="/registration"
          title="Вход"
          disabled={!isValid || !dirty}
        >
          <ul className="auth__list auth__list_active">
            <li>
              <AuthInput
                type="email"
                placeholder="Email*"
                name="email"
                htmlFor="email"
                isInputPassword={false}
                onChange={handleChange}
                value={values.email}
                errors={errors.email}
                touched={touched.email}
              />
            </li>
            <li>
              <AuthInput
                type="password"
                placeholder="Пароль*"
                name="password"
                htmlFor="password"
                isInputPassword={true}
                onChange={handleChange}
                value={values.password}
                errors={errors.password}
                touched={touched.password}
              />
            </li>
          </ul>
        </AuthForm>
      )}
    </Formik>
  );
};

export default LoginPage;
