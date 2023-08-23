import React, { ReactElement, useState } from 'react';
import '@/components/AuthInput/AuthInput.scss';
import { IPropsAuthInput } from '@/types/componentsInrefaces';

const AuthInput = ({
  type,
  placeholder,
  name,
  htmlFor,
  isInputPassword,
  onChange,
  value,
  errors,
  touched,
}: IPropsAuthInput): ReactElement => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPassword = (): void => {
    if (isShowPassword) {
      setIsShowPassword(false);
    } else {
      setIsShowPassword(true);
    }
  };

  return (
    <>
      <div className={`auth__container-field ${(isInputFocused || value) && 'auth__container-field_active'}`}>
        <div className="auth__container-input">
          <label className={`auth__label ${(isInputFocused || value) && 'auth__label_active'}`} htmlFor={htmlFor}>
            {placeholder}
          </label>
          <input
            className={`auth__input ${errors ? 'auth__input_error' : ''}`}
            id={htmlFor}
            name={name}
            type={isShowPassword ? 'text' : type}
            placeholder={placeholder}
            onFocus={(): void => setIsInputFocused(true)}
            onBlur={(): void => setIsInputFocused(false)}
            value={value}
            onChange={onChange}
          />
        </div>
        {isInputPassword && (isInputFocused || value) && (
          <button
            className={`auth__button-pass ${isShowPassword && value && 'auth__button-pass_active'}`}
            type="button"
            onClick={handleShowPassword}
          ></button>
        )}
      </div>
      <p className="auth__input-error">{errors ? errors || touched : ''}</p>
    </>
  );
};

export default AuthInput;
