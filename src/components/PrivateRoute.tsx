import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useMe } from '../context/me';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
	const { user } = useMe();
	return (<>{user ? children : <Navigate to='/login' replace />}</>)
};

export default PrivateRoute;
