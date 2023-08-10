import React, { ReactElement } from 'react';
import '@/components/Input/Input.scss';
import { IPropsInput } from '@/types/interfaces';

const Input = ({
  className,
  classNameLabel,
  type,
  placeholder,
  title,
  name,
  checked,
  children,
  onChange,
}: IPropsInput): ReactElement => {
  return (
    <label className={classNameLabel}>
      {title}
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        checked={checked}
      />
      {children}
    </label>
  );
};

export default Input;
