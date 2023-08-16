import React, { ReactElement, useState } from 'react';
import '@/pages/Registration/Registration.scss';
import { Formik } from 'formik';
import AuthInput from '@/components/AuthInput/AuthInput';
import AuthForm from '@/components/AuthForm/AuthForm';
import { AddressType, RegisterSchemaType, SetFieldValueType } from '@/types/types';
import ListAddress from '@/pages/Registration/components/ListAddress/ListAddress';
import AddressFields from '@/pages/Registration/components/AddressFields/AddressFields';
import { RegisterSchema } from '@/utils/helpers/validationSchemes';

const RegistrationPage = (): ReactElement => {
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [isShippingAddress, setIsShippingAddress] = useState(false);
  const [isBillingAddress, setIsBillingAddress] = useState(false);

  const [accordionShippingTitle, setAcordionShippingTitle] = useState('Польша');
  const [postalCodeShippingValue, setPostalCodeShippingValue] = useState('');
  const [isPostalCodeShippingError, setIsPostalCodeShippingError] = useState(true);

  const [accordionBillingTitle, setAcordionBillingTitle] = useState('Польша');
  const [postalCodeBillingValue, setPostalCodeBillingValue] = useState('');
  const [isPostalCodeBillingError, setIsPostalCodeBillingError] = useState(true);

  const [shippingAddresses, setShippingAddresses] = useState<AddressType[]>([]);
  const [billingAddresses, setBillingAddresses] = useState<AddressType[]>([]);

  const handleRegister = (values: RegisterSchemaType): void => {
    console.log(values);
    console.log(1);
  };

  const handleAddAddresses = (): void => {
    setIsAddAddress(true);
  };

  const handlePrevRegister = (): void => {
    setIsAddAddress(false);
    setIsShippingAddress(false);
    setIsBillingAddress(false);
  };

  const handleOpenAddressShipping = (): void => {
    setIsShippingAddress(true);
  };

  const handleOpenAddressBilling = (): void => {
    setIsBillingAddress(true);
  };

  const handleAddShippingAddress = (values: RegisterSchemaType, setFieldValue: SetFieldValueType): void => {
    setIsShippingAddress(false);
    setFieldValue('shippingCountry', '');
    setFieldValue('shippingCity', '');
    setFieldValue('shippingIndex', '');
    setFieldValue('shippingStreet', '');
    setShippingAddresses((prevAddresses) => [
      ...prevAddresses,
      {
        country: accordionShippingTitle,
        city: values.shippingCity,
        index: postalCodeShippingValue,
        street: values.shippingStreet,
      },
    ]);
  };

  const handleAddBillingAddress = (values: RegisterSchemaType, setFieldValue: SetFieldValueType): void => {
    setIsBillingAddress(false);
    setFieldValue('billingCountry', '');
    setFieldValue('billingCity', '');
    setFieldValue('billingIndex', '');
    setFieldValue('billingStreet', '');
    setBillingAddresses((prevAddresses) => [
      ...prevAddresses,
      {
        country: accordionBillingTitle,
        city: values.billingCity,
        index: postalCodeBillingValue,
        street: values.billingStreet,
      },
    ]);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        date: '',
        email: '',
        password: '',
        passwordRepeat: '',
        shipping: '',
        billing: '',
        // shippingCountry: '',
        shippingCity: '',
        // shippingIndex: '',
        shippingStreet: '',
        // billingCountry: '',
        billingCity: '',
        // billingIndex: '',
        billingStreet: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={handleRegister}
    >
      {({ values, errors, touched, handleChange, dirty, setFieldValue }): JSX.Element => (
        <AuthForm
          name="form-register"
          text="Уже зарегистрированы?"
          textLink="Войти"
          textButton="Зарегистрироваться"
          path="/login"
          title="Регистрация"
          isRegister={true}
          disabled={
            !dirty ||
            !!(
              errors.firstName ||
              errors.lastName ||
              errors.date ||
              errors.email ||
              errors.password ||
              errors.passwordRepeat ||
              errors.shipping ||
              errors.billing
            )
          }
          isAddAddress={isAddAddress}
          handlePrevRegister={handlePrevRegister}
        >
          <ul
            className={`auth__list auth__list_type_main ${isAddAddress ? 'auth__list_inactive' : 'auth__list_active'}`}
          >
            <li>
              <AuthInput
                type="text"
                placeholder="Имя*"
                name="firstName"
                htmlFor="firstName"
                isInputPassword={false}
                onChange={handleChange}
                value={values.firstName}
                errors={errors.firstName}
                touched={touched.firstName}
              />
            </li>
            <li>
              <AuthInput
                type="text"
                placeholder="Фамилия*"
                name="lastName"
                htmlFor="lastName"
                isInputPassword={false}
                onChange={handleChange}
                value={values.lastName}
                errors={errors.lastName}
                touched={touched.lastName}
              />
            </li>
            <li>
              <AuthInput
                type="date"
                placeholder="Дата рождения*"
                name="date"
                htmlFor="date"
                isInputPassword={false}
                onChange={handleChange}
                value={values.date}
                errors={errors.date}
                touched={touched.date}
              />
            </li>
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
            <li>
              <AuthInput
                type="password"
                placeholder="Повторите пароль*"
                name="passwordRepeat"
                htmlFor="passwordRepeat"
                isInputPassword={true}
                onChange={handleChange}
                value={values.passwordRepeat}
                errors={errors.passwordRepeat}
                touched={touched.passwordRepeat}
              />
            </li>
          </ul>

          {!isAddAddress && (
            <>
              <button className="auth__button auth__button_type_add" type="button" onClick={handleAddAddresses}>
                Добавить адреса
              </button>
            </>
          )}

          <ul className={`auth__list ${isAddAddress ? 'auth__list_active' : 'auth__list_inactive'}`}>
            <li>
              <h2 className="auth__subtitle">Добавьте адреса для доставок</h2>
              {!isShippingAddress && (
                <>
                  <button className="auth__button-add" type="button" onClick={handleOpenAddressShipping}></button>
                  <ListAddress
                    name="shipping"
                    onChange={handleChange}
                    addresses={shippingAddresses}
                    setAddresses={setShippingAddresses}
                    setAddressesAnother={setBillingAddresses}
                  />
                  <p className="auth__input-error">{errors.shipping && errors.shipping}</p>
                </>
              )}
            </li>

            {isShippingAddress && (
              <>
                <AddressFields
                  onChange={handleChange}
                  name="shipping"
                  city={values.shippingCity}
                  street={values.shippingStreet}
                  cityErrors={errors.shippingCity}
                  streetErrors={errors.shippingStreet}
                  cityTouched={touched.shippingCity}
                  streetTouched={touched.shippingStreet}
                  setIsPostalCodeError={setIsPostalCodeShippingError}
                  accordionTitle={accordionShippingTitle}
                  setAcordionTitle={setAcordionShippingTitle}
                  postalCodeValue={postalCodeShippingValue}
                  setPostalCodeValue={setPostalCodeShippingValue}
                />
                <button
                  className="auth__button auth__button_type_add"
                  type="button"
                  disabled={
                    !!(isPostalCodeShippingError || errors.shippingCity || errors.shippingStreet) ||
                    !values.shippingCity ||
                    !values.shippingStreet
                  }
                  onClick={(): void => handleAddShippingAddress(values, setFieldValue)}
                >
                  Добавить
                </button>
              </>
            )}

            <li>
              <h2 className="auth__subtitle">Добавьте адреса для выставления счетов</h2>
              {!isBillingAddress && (
                <>
                  <button className="auth__button-add" type="button" onClick={handleOpenAddressBilling}></button>
                  <ListAddress
                    name="billing"
                    onChange={handleChange}
                    addresses={billingAddresses}
                    setAddresses={setBillingAddresses}
                    setAddressesAnother={setShippingAddresses}
                  />
                  <p className="auth__input-error">{errors.billing && errors.billing}</p>
                </>
              )}
            </li>

            {isBillingAddress && (
              <>
                <AddressFields
                  onChange={handleChange}
                  name="billing"
                  city={values.billingCity}
                  street={values.billingStreet}
                  cityErrors={errors.billingCity}
                  streetErrors={errors.billingStreet}
                  cityTouched={touched.billingCity}
                  streetTouched={touched.billingStreet}
                  setIsPostalCodeError={setIsPostalCodeBillingError}
                  accordionTitle={accordionBillingTitle}
                  setAcordionTitle={setAcordionBillingTitle}
                  postalCodeValue={postalCodeBillingValue}
                  setPostalCodeValue={setPostalCodeBillingValue}
                />
                <button
                  className="auth__button auth__button_type_add"
                  type="button"
                  disabled={
                    !!(isPostalCodeBillingError || errors.billingCity || errors.billingStreet) ||
                    !values.billingCity ||
                    !values.billingStreet
                  }
                  onClick={(): void => handleAddBillingAddress(values, setFieldValue)}
                >
                  Добавить
                </button>
              </>
            )}
          </ul>
        </AuthForm>
      )}
    </Formik>
  );
};

export default RegistrationPage;
