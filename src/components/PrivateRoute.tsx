import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useMe } from '../context/me';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
	const user = useMe();
	console.log('email', user?.user.email);

	return user?.user._id ? <>{children}</> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
