import { notification } from 'antd';
import React from 'react';
import { CommonErrors } from '@/enums/apiErrors';

interface ErrorMessages {
  [key: string]: string;
}

const errorMessages: ErrorMessages = {
  [CommonErrors.EmailExists]: 'Пользователь с таким email уже существует! Войдите на сайт либо введите другой email',
  [CommonErrors.CredentialsNotFound]: 'Вы ввели неправильный логин или пароль',
  [CommonErrors.ServerError]: 'Ошибка сервера, повторите запрос позднее',
  [CommonErrors.ServiceUnavailable]: 'На данный момент сервер перегружен, повторите запрос позднее',
  DiscountCodeNonApplicable: 'Введенного промокода не существует',
};

const getErrorMessage = (status: number, errorMessage: string, code: string): string => {
  if (errorMessage in errorMessages) {
    return errorMessages[errorMessage];
  }

  if (status.toString() in errorMessages) {
    return errorMessages[status.toString()];
  }

  if (code in errorMessages) {
    return errorMessages[code];
  }

  return 'Произошла ошибка';
};

const showNotification = (description: string): void => {
  notification.error({
    message: <p className="auth__notification auth__notification_type_main">Возникла ошибка!</p>,
    description: <p className="auth__notification">{description}</p>,
  });
};

const handleErrors = (status: number, errorMessage: string, code: string = ''): void => {
  const description = getErrorMessage(status, errorMessage, code);
  showNotification(description);
};

export default handleErrors;
