import { useContext } from 'react';
import { AuthContext } from '@/hoc/AuthProvider';
import { IAuthContextValue } from '@/types/interfaces';

export default function useAuth(): IAuthContextValue {
  return useContext(AuthContext);
}
