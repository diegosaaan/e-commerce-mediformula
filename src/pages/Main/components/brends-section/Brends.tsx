import './Brends.scss';
import React, { ReactElement } from 'react';
import brendsData from './brendsData';

const Brends = (): ReactElement => {
  return (
    <div className="brends container">
      <h2 className="heading brends_heading">Популярные бренды</h2>
      <ul className="brends__list">
        {brendsData.map(
          ({ link, classModifier, key }): ReactElement => (
            <li key={key} className="brends__list-item">
              <a className={`brends__list-link brends__list-link-${classModifier}`} href={link} target="_blank"></a>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Brends;
