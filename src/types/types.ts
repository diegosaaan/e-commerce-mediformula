export type AddressType = {
  country: string;
  city: string;
  index: string;
  street: string;
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
