import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useMe } from '../context/me';

const AuthRoute = ({ children }: { children: ReactNode }) => {
	const { user } = useMe();
	return (
  <>
  {user ? <Navigate to='/' replace /> : children}</>);
};

export default AuthRoute;
