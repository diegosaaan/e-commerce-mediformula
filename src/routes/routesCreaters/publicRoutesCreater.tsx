import React, { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import publicRoutesData from '../routesData/publicRoutesData';

function createPublicRoutes(): ReactElement[] {
  return publicRoutesData.map((data) => <Route {...data} />);
}

export default createPublicRoutes;
