import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '@/utils/hooks/useAuth';

interface IPublicRouteProps {
  children: ReactElement;
  page: string;
}

export default function PublicRoute({ children, page }: IPublicRouteProps): ReactElement {
  const { isUserLoggedIn } = useAuth();
  const isLoginOrRegistrationPage = page === 'Login' || page === 'Registration';

  if (isLoginOrRegistrationPage && isUserLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}
