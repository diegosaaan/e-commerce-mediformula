import '@/pages/Registration/components/AddressFields/AddressFields.scss';
import React, { ReactElement } from 'react';
import AuthInput from '@/components/AuthInput/AuthInput';
import { IPropsAddressFields } from '@/types/interfaces';

const AddressFields = ({
  name,
  onChange,
  country,
  city,
  index,
  street,
  countryErrors,
  cityErrors,
  indexErrors,
  streetErrors,
  countryTouched,
  cityTouched,
  indexTouched,
  streetTouched,
}: IPropsAddressFields): ReactElement => {
  return (
    <ul className="auth__list auth__list_active">
      <li>
        {/* <AuthInput
          type="text"
          placeholder="Страна*"
          name={`${name}Country`}
          htmlFor={`${name}Country`}
          onChange={onChange}
          value={country}
          errors={countryErrors}
          touched={countryTouched}
        /> */}
        <select className="auth__select" name={`${name}Country`}>
          <option value={country}>Австрия</option>
          <option value={country}>Германия</option>
          <option value={country}>Франция</option>
          <option value={country}>США</option>
          <option value={country}>Польша</option>
          <option value={country}>Бельгия</option>
        </select>
        <p className="auth__input-error">{countryErrors ? countryErrors || countryTouched : ''}</p>
      </li>
      <li>
        <AuthInput
          type="text"
          placeholder="Город*"
          name={`${name}City`}
          htmlFor={`${name}City`}
          onChange={onChange}
          value={city}
          errors={cityErrors}
          touched={cityTouched}
        />
      </li>
      <li>
        <AuthInput
          type="text"
          placeholder="Почтовый индекс*"
          name={`${name}Index`}
          htmlFor={`${name}Index`}
          onChange={onChange}
          value={index}
          errors={indexErrors}
          touched={indexTouched}
        />
      </li>
      <li>
        <AuthInput
          type="text"
          placeholder="Улица*"
          name={`${name}Street`}
          htmlFor={`${name}Street`}
          onChange={onChange}
          value={street}
          errors={streetErrors}
          touched={streetTouched}
        />
      </li>
    </ul>
  );
};

export default AddressFields;
