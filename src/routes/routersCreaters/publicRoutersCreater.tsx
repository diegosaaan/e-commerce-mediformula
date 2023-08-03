import React, { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import { IRouteData } from '@/types/interfaces';

function publicRoutersCreater(data: IRouteData): ReactElement {
  return <Route {...data} />;
}

export default publicRoutersCreater;
