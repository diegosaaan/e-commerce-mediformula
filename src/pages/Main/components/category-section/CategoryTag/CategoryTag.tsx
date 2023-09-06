import React, { ReactElement } from 'react';
import './CategoryTag.scss';
import { IPropsTag } from '@/types/componentsInrefaces';

const CategoryTag = ({ title }: IPropsTag): ReactElement => {
  return (
    <>
      <div className="tag">
        <p className="tag__tagText">{title}</p>
      </div>
    </>
  );
};

export default CategoryTag;
