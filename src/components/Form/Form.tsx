import React, { ReactElement } from 'react';
import '@/components/Form/Form.scss';
import { IPropsForm } from '@/types/interfaces';

const Form = ({ className, name, onSubmit, children }: IPropsForm): ReactElement => {
  return (
    <>
      <form className={className} name={name} onSubmit={onSubmit}>
        {children}
      </form>
    </>
  );
};

export default Form;
