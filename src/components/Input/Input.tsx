import React, { ReactElement } from 'react';
import '@/components/Input/Input.scss';
import { IPropsInput } from '@/types/componentsInrefaces';

const Input = ({
  className,
  classNameLabel,
  type,
  placeholder,
  title,
  name,
  checked,
  children,
  value,
  onChange,
  onKeyDown,
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
        onKeyDown={onKeyDown}
        checked={checked}
        value={value}
      />
      {children}
    </label>
  );
};

export default Input;
