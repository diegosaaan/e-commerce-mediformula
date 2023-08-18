import '@/pages/Login/Login.scss';
import React, { ReactElement } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { createNewUserToken, saveUserToken } from '@/services/tokenHelpers';
import { LoginSchema } from '@/utils/helpers/yup/validationSchemes';
import useAuth from '@/utils/hooks/useAuth';
import AuthInput from '@/components/AuthInput/AuthInput';
import AuthForm from '@/components/AuthForm/AuthForm';
import { LoginSchemaType } from '@/types/types';
import * as userAuth from '@/services/userAuth';
import handleErrors from '@/utils/helpers/errorHandlers/errorHandlers';
import { IUserTokenData } from '@/types/apiInterfaces';

const LoginPage = (): ReactElement => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (values: LoginSchemaType): void => {
    const { email, password } = values;
    userAuth
      .login(email, password)
      .then(() => {
        createNewUserToken(email, password).then((result) => {
          if (result !== null && typeof result === 'object') {
            message.info({
              content: 'Добро пожаловать!',
            });
            signIn(() => navigate('/'));
            saveUserToken(result as IUserTokenData);
          }
        });
      })
      .catch((error) => {
        const {
          response: {
            data: { statusCode, message: errorMessage },
          },
        } = error;

        handleErrors(statusCode, errorMessage);
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
