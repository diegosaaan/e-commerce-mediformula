import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '@/utils/hooks/useAuth';

export const PrivateLoginAndRegistrationRoute = ({ children }: { children: ReactElement }): ReactElement => {
  const { isUserLoggedIn } = useAuth();

  if (isUserLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const PrivateRouteForAuthorizedUser = ({ children }: { children: ReactElement }): ReactElement => {
  const { isUserLoggedIn } = useAuth();

  if (isUserLoggedIn) {
    return children;
  }

  return <Navigate to="/login" replace />;
};
