import React, { ReactElement } from 'react';
import { Route, Navigate } from 'react-router-dom';
import privateRoutesData from '../routesData/privateRoutesData';

function createPrivateRoutes(isAuthenticated: boolean): ReactElement[] {
  return privateRoutesData.map(({ element, ...rest }) => (
    <Route {...rest} element={isAuthenticated ? element : <Navigate to="/login" />} />
  ));
}

export default createPrivateRoutes;
