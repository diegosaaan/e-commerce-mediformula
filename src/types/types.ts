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

  // shippingCountry: string;
  shippingCity: string;
  // shippingIndex: string;
  shippingStreet: string;

  // billingCountry: string;
  billingCity: string;
  // billingIndex: string;
  billingStreet: string;
};

export type SetFieldValueType = (field: string, value: string, shouldValidate?: boolean) => void;
