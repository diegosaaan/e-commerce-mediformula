import React, { ReactElement } from 'react';
import AuthInput from '@/components/AuthInput/AuthInput';
import { IPropsAddressFields } from '@/types/interfaces';

const AddressFields = ({ address, onChange }: IPropsAddressFields): ReactElement => {
  return (
    <ul className="auth__list auth__list_active">
      <li>
        <AuthInput
          type="text"
          placeholder="Страна*"
          name="country"
          htmlFor="country"
          onChange={onChange}
          value={address.country}
        />
      </li>
      <li>
        <AuthInput
          type="text"
          placeholder="Город*"
          name="city"
          htmlFor="city"
          onChange={onChange}
          value={address.city}
        />
      </li>
      <li>
        <AuthInput
          type="text"
          placeholder="Почтовый индекс*"
          name="index"
          htmlFor="index"
          onChange={onChange}
          value={address.index}
        />
      </li>
      <li>
        <AuthInput
          type="text"
          placeholder="Улица*"
          name="street"
          htmlFor="street"
          onChange={onChange}
          value={address.street}
        />
      </li>
    </ul>
  );
};

export default AddressFields;
