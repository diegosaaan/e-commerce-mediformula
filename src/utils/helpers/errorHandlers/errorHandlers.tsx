import { notification } from 'antd';
import React from 'react';
import { CommonErrors } from '@/enums/apiErrors';

const handleErrors = (status: number, errorMessage: string): void => {
  let description = <p className="auth__notification">При регистрации возникла ошибка</p>;

  if (errorMessage === CommonErrors.EmailExists) {
    description = (
      <p className="auth__notification">
        Пользователь с таким email уже существует! Войдите на сайт либо введите другой email
      </p>
    );
  }

  if (errorMessage === CommonErrors.CredentialsNotFound) {
    description = <p className="auth__notification">Вы ввели неправильный логин или пароль</p>;
  }

  if (status === CommonErrors.ServerError) {
    description = <p className="auth__notification">Ошибка сервера, повторите запрос позднее</p>;
  }

  if (status === CommonErrors.ServiceUnavailable) {
    description = <p className="auth__notification">На данный момент сервер перегружен, повторите запрос позднее</p>;
  }

  notification.error({
    message: <p className="auth__notification auth__notification_type_main">Возникла ошибка!</p>,
    description,
  });
};

export default handleErrors;
