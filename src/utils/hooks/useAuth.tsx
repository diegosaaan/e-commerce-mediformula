import { useContext } from 'react';
import { AuthContext } from '@/hoc/AuthProvider';
import { IAuthContextValue } from '@/types/interfaces';

const useAuth = (): IAuthContextValue => useContext(AuthContext);

export default useAuth;
