import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useMe } from '../context/me';

const AuthRoute = ({ children }: { children: ReactNode }) => {
	const user = useMe();
	console.log('username', user?.user.username);

	return user?.user._id ? <Navigate to='/' replace /> : <>{children}</>;
};

export default AuthRoute;
