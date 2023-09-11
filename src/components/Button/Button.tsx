import React, { ReactElement } from 'react';
import '@/components/Button/Button.scss';
import { IPropsButton } from '@/types/componentsInrefaces';
import useAuth from '@/utils/hooks/useAuth';

const Button = ({ id, type, text, onClick, className, disabled, children }: IPropsButton): ReactElement => {
  const { isContentLoaded } = useAuth();

  return (
    <>
      <button
        className={className}
        type={type}
        onClick={onClick}
        disabled={!isContentLoaded || disabled}
        id={`${id || ''}`}
      >
        {text}
        {children}
      </button>
    </>
  );
};

export default Button;
