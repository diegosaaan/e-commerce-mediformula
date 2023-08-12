import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '@/utils/hooks/useAuth';

const PrivateRoute = ({ children }: { children: ReactElement }): ReactElement => {
  const { isUserLoggedIn } = useAuth();

  if (isUserLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
