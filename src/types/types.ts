export type AddressType = {
  country: string;
  city: string;
  postalCode: string;
  streetName: string;
};

export type LoginSchemaType = {
  email: string;
  password: string;
};

export type RegisterSchemaType = {
  firstName: string;
  lastName: string;
  date: string;
  email: string;
  password: string;
  passwordRepeat: string;
  shipping: string;
  billing: string;
};

export type EditUserSchemaType = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
};

export type EditPasswordSchemaType = {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
};
