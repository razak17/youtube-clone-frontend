import { AxiosError } from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { login } from '../lib/api';
import {
	StyledButton,
	StyledContainer,
	StyledInput,
	StyledSection,
	StyledSpan,
	StyledSubTitle,
	StyledTitle
} from './Register';
import GoogleLogin from './GoogleLogin';
import { QueryKeys } from '../types';

const Login = () => {
	const [formData, setFormData] = useState({
		email: 'bob@email.com',
		password: 'bobishere'
	});
	const navigate = useNavigate();
	const state = useLocation();
	const queryClient = useQueryClient();

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const mutation = useMutation<string, AxiosError, Parameters<typeof login>['0']>(login, {
		onSuccess: () => {
			navigate(state.state || '/', { replace: true });
			queryClient.invalidateQueries([QueryKeys.ME]);
		}
	});

	const handleLogin = () => {
		mutation.mutate(formData);
	};

	return (
		<StyledContainer>
			<StyledSection>
				<StyledTitle>
					<h1>Login</h1>
				</StyledTitle>

				<StyledSubTitle>sign in to continue</StyledSubTitle>
				<StyledInput name='email' placeholder='Email' value={formData.email} onChange={handleChangeInput} />
				<StyledInput
					type='password'
					name='password'
					placeholder='Password'
					value={formData.password}
					onChange={handleChangeInput}
				/>
				<StyledButton onClick={handleLogin}>Login</StyledButton>
				<StyledSpan>
					new user? <Link to='/register'>register</Link>
				</StyledSpan>
				<GoogleLogin />
			</StyledSection>
		</StyledContainer>
	);
};

export default Login;
