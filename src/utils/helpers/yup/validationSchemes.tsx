import * as Yup from 'yup';

const MINIMUM_AGE = 13;

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Поле обязательно к заполнению')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Поле должно содержать адрес электронной почты (test@test.com) и не содержать пробелов'
    )
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
    .matches(/[!@#$%^&*]/, 'Пароль должен содержать хотя бы один специальный символ')
    .test('no-leading-trailing-spaces', 'Пароль не должен содержать начальных или завершающих пробелов', (value) => {
      return value === value.trim();
    }),
});

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Поле обязательно к заполнению')
    .min(1, 'Поле должно содержать хотя бы один символ')
    .matches(
      /^[A-Za-zА-Яа-я]+$/u,
      'Поле должно содержать хотя бы один символ и не содержать специальных символов или цифр'
    ),
  lastName: Yup.string()
    .required('Поле обязательно к заполнению')
    .min(1, 'Поле должно содержать хотя бы один символ')
    .matches(
      /^[A-Za-zА-Яа-я]+$/u,
      'Поле должно содержать хотя бы один символ и не содержать специальных символов или цифр'
    ),
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
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Поле должно содержать адрес электронной почты (test@test.com) и не содержать пробелов'
    )
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
    .matches(/[!@#$%^&*]/, 'Пароль должен содержать хотя бы один специальный символ')
    .test('no-leading-trailing-spaces', 'Пароль не должен содержать начальных или завершающих пробелов', (value) => {
      return value === value.trim();
    }),
  passwordRepeat: Yup.string()
    .required('Повторите пароль')
    .test('password-match', 'Пароли не совпадают', (value, testContext) => {
      const parentPassword = testContext.parent.password;
      return value === parentPassword;
    }),

  shipping: Yup.string().required('Выберите вариант доставки по умолчанию'),
  billing: Yup.string().required('Выберите вариант выставления счета по умолчанию'),
});
