import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { login } from '../lib/api';
import {
	StyledButton,
	StyledInput,
	StyledSection,
	StyledSpan,
	StyledTitle
} from './Register';
import { useNavigate } from 'react-router-dom';
import { useMe } from '../context/me';

const Login = () => {
	const [formData, setFormData] = useState({
		email: 'bo@email.com',
		password: 'cruzmissile'
	});
	const navigate = useNavigate();
	const location = useLocation();
	const userContext = useMe();

	const user = userContext?.user;

	const handleChangeInput = (
		e: React.ChangeEvent<HTMLInputElement> &
			React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const mutation = useMutation<
		string,
		AxiosError,
		Parameters<typeof login>['0']
	>(login, {
		onSuccess: () => {
			// 👇️ replace set to true
			navigate('/', { replace: true });
			{
				/* const origin: unknown = location.state?.from.pathname as string || '/dashboard'; */
			}
			{
				/* navigate(origin, { replace: true }); */
			}
		}
	});

	const handleLogin = () => {
		console.log(formData);
		mutation.mutate(formData);
	};

	return (
		<StyledSection>
			<StyledTitle>
				<h1>Login</h1>
			</StyledTitle>
			<StyledInput
				name='email'
				value={formData.email}
				placeholder='Email'
				onChange={handleChangeInput}
			/>
			<StyledInput
				name='password'
				value={formData.email}
				onChange={handleChangeInput}
				type='password'
				placeholder='Password'
			/>
			<StyledButton onClick={handleLogin}>Login</StyledButton>
			<StyledSpan>
				new user? <Link to='/register'>register</Link>
			</StyledSpan>
		</StyledSection>
	);
};

export default Login;
