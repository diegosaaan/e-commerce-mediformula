import '@/pages/Login/Login.scss';
import React, { ReactElement, useState } from 'react';
import { message } from 'antd';
import { useNavigate, useNavigation } from 'react-router-dom';
import { Formik } from 'formik';
import { createNewUserToken, saveUserToken } from '@/services/tokenHelpers';
import { LoginSchema } from '@/utils/helpers/yup/validationSchemes';
import useAuth from '@/utils/hooks/useAuth';
import AuthInput from '@/components/AuthInput/AuthInput';
import AuthFormSection from '@/components/AuthFormSection/AuthFormSection';
import { LoginSchemaType } from '@/types/types';
import * as userAuth from '@/services/userAuth';
import handleErrors from '@/utils/helpers/errorHandlers/errorHandlers';
import { IUserTokenData } from '@/types/apiInterfaces';
import SpinnerPreloader from '@/components/Preloaders/SpinnerPreloader/SpinnerPreloader';

const LoginPage = (): ReactElement => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [isDataFetching, setIsDataFetching] = useState(false);

  const handleLogin = async (values: LoginSchemaType): Promise<void> => {
    setIsDataFetching(true);
    const { email, password } = values;

    try {
      await userAuth.login(email, password);
      const userTokenData = await createNewUserToken(email, password);
      if (userTokenData !== null && typeof userTokenData === 'object') {
        message.info({
          content: 'Добро пожаловать!',
        });
        signIn(() => navigate('/'));
        saveUserToken(userTokenData as IUserTokenData, '1SortUserToken');
        localStorage.removeItem('1SortAnonymousToken');
      }
    } catch (e) {
      setIsDataFetching(false);
      const error = e as { response: { data: { statusCode: number; message: string } } };
      const {
        response: {
          data: { statusCode, message: errorMessage },
        },
      } = error;
      console.error('Произошла ошибка:', e);
      handleErrors(statusCode, errorMessage);
    }
  };

  return (
    <>
      {(isDataFetching || navigation.state === 'loading') && (
        <SpinnerPreloader
          pageClassname="registration"
          isDataFetching={isDataFetching || navigation.state === 'loading'}
        />
      )}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleChange, isValid, dirty }): JSX.Element => (
          <AuthFormSection
            name="form-login"
            text="Еще не зарегистрированы?"
            textLink="Регистрация"
            textButton="Войти"
            path="/registration"
            title="Вход"
            disabled={!isValid || !dirty}
            isDataFetching={isDataFetching}
          >
            <ul className="auth__list auth__list_active">
              <li>
                <AuthInput
                  type="text"
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
          </AuthFormSection>
        )}
      </Formik>
    </>
  );
};

export default LoginPage;
