import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '@/utils/hooks/useAuth';

export default function PrivateRoute({ children }: { children: ReactElement }): ReactElement {
  const location = useLocation();
  const { isUserLoggedIn } = useAuth();

  if (!isUserLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
