export interface IFormData {
  fieldName: string;
  fieldValue: string;
}

export const validRegistrationFormData: IFormData[] = [
  {
    fieldName: 'Имя*',
    fieldValue: 'John',
  },
  {
    fieldName: 'Фамилия*',
    fieldValue: 'Carvi',
  },
  {
    fieldName: 'Дата рождения*',
    fieldValue: '1990-01-01',
  },
  {
    fieldName: 'Email*',
    fieldValue: 'johndoe@example.com',
  },
  {
    fieldName: 'Пароль*',
    fieldValue: 'Password123@',
  },
  {
    fieldName: 'Повторите пароль*',
    fieldValue: 'Password123@',
  },
];

export const validAddressFormData: IFormData[] = [
  {
    fieldName: 'Город*',
    fieldValue: 'Самосир',
  },
  {
    fieldName: 'Почтовый индекс*',
    fieldValue: '22-222',
  },
  {
    fieldName: 'Улица*',
    fieldValue: 'Улица',
  },
];

export const invalidRegistrationFormData: IFormData[] = [
  {
    fieldName: 'Имя*',
    fieldValue: '$John123',
  },
  {
    fieldName: 'Фамилия*',
    fieldValue: '$Carvi123',
  },
  {
    fieldName: 'Дата рождения*',
    fieldValue: '2023-01-01',
  },
  {
    fieldName: 'Email*',
    fieldValue: '_johndoeample.com_',
  },
  {
    fieldName: 'Пароль*',
    fieldValue: 'assword12',
  },
  {
    fieldName: 'Повторите пароль*',
    fieldValue: 'Pasqwerty',
  },
];

export const invalidAddressFormData: IFormData[] = [
  {
    fieldName: 'Город*',
    fieldValue: '$21531',
  },
  {
    fieldName: 'Почтовый индекс*',
    fieldValue: '22f222',
  },
  {
    fieldName: 'Улица*',
    fieldValue: '%%%',
  },
];
