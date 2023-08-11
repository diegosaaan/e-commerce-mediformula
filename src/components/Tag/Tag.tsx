import React, { ReactElement } from 'react';
import '@/components/Tag/Tag.scss';
import { IPropsTag } from '@/types/interfaces';

const Tag = ({ title }: IPropsTag): ReactElement => {
  return (
    <>
      <div className="tag">
        <p className="tag__tagText">{title}</p>
      </div>
    </>
  );
};

export default Tag;
