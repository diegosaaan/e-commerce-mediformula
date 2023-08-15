import * as Yup from 'yup';

const MINIMUM_AGE = 13;

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Поле обязательно к заполнению')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Неправильный формат адреса электронной почты')
    .test(
      'no-leading-trailing-spaces',
      'Адрес электронной почты не должен содержать начальных или завершающих пробелов',
      (value) => {
        return value === value.trim();
      }
    ),
  // не получается вывести ошибку о наличии пробелов в конце и в начале строки
  password: Yup.string()
    .required('Поле обязательно к заполнению')
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .matches(/[A-ZА-ЯЁ]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .matches(/[a-zа-яё]/, 'Пароль должен содержать хотя бы одну строчную букву')
    .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
    .matches(/[!@#$%^&*]/, 'Пароль должен содержать хотя бы один специальный символ')
    .test('no-leading-trailing-spaces', 'Пароль не должен содержать начальных или завершающих пробелов', (value) => {
      return value === value.trim();
    }),
});

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Поле обязательно к заполнению')
    .min(1, 'Имя пользователя должно содержать хоты бы 1 букву')
    .matches(/^[A-Za-zА-Яа-я]+$/u, 'Имя пользователя должно содержать только буквы'),
  lastName: Yup.string()
    .required('Поле обязательно к заполнению')
    .min(1, 'Фамилия пользователя должна содержать хоты бы 1 букву')
    .matches(/^[A-Za-zА-Яа-я]+$/u, 'Фамилия пользователя должна содержать только буквы'),
  date: Yup.string()
    .required('Поле обязательно к заполнению')
    .test('valid-age', `Вы должны быть старше ${MINIMUM_AGE} лет`, (value) => {
      const currentDate = new Date();
      const userDate = new Date(value);
      const age = currentDate.getFullYear() - userDate.getFullYear();
      return age >= MINIMUM_AGE;
    }),
  email: Yup.string()
    .required('Поле обязательно к заполнению')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Неправильный формат адреса электронной почты')
    .test(
      'no-leading-trailing-spaces',
      'Адрес электронной почты не должен содержать начальных или завершающих пробелов',
      (value) => {
        return value === value.trim();
      }
    ),
  password: Yup.string()
    .required('Поле обязательно к заполнению')
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .matches(/[A-ZА-ЯЁ]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .matches(/[a-zа-яё]/, 'Пароль должен содержать хотя бы одну строчную букву')
    .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
    .matches(/[!@#$%^&*]/, 'Пароль должен содержать хотя бы один специальный символ') // ?
    .test('no-leading-trailing-spaces', 'Пароль не должен содержать начальных или завершающих пробелов', (value) => {
      return value === value.trim();
    }),
  passwordRepeat: Yup.string()
    .required('Повторите пароль')
    .test('password-match', 'Пароли не совпадают', (value, testContext) => {
      const parentPassword = testContext.parent.password;
      return value === parentPassword;
    })
    .min(8, 'Пароль должен содержать не менее 8 символов'),

  shipping: Yup.string().required('Выберите вариант доставки по умолчанию'),
  billing: Yup.string().required('Выберите вариант выставления счета по умолчанию'),

  shippingCountry: Yup.string().required('Поле обязательно к заполнению'),
  shippingCity: Yup.string()
    .required('Поле обязательно к заполнению')
    .matches(/^(?=.*[a-zA-Zа-яА-Я])[^\d!@#$%^&*]*$/, 'Поле не должно содержать спецсимволов и цифр'),
  shippingIndex: Yup.string().required('Поле обязательно к заполнению'),
  shippingStreet: Yup.string()
    .required('Поле обязательно к заполнению')
    .min(1, 'Улица должна содержать хоты бы 1 символ'),

  billingCountry: Yup.string().required('Поле обязательно к заполнению'),
  billingCity: Yup.string()
    .required('Поле обязательно к заполнению')
    .matches(/^(?=.*[a-zA-Zа-яА-Я])[^\d!@#$%^&*]*$/, 'Поле не должно содержать спецсимволов и цифр'),
  billingIndex: Yup.string().required('Поле обязательно к заполнению'),
  billingStreet: Yup.string()
    .required('Поле обязательно к заполнению')
    .min(1, 'Улица должна содержать хоты бы 1 символ'),
});
