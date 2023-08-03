import React, { ReactElement } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { IRouteData } from '@/types/interfaces';

function privateRoutersCreater({ element, ...rest }: IRouteData, isAuthenticated: boolean): ReactElement {
  return <Route {...rest} element={isAuthenticated ? element : <Navigate to="/login" />} />;
}

export default privateRoutersCreater;
