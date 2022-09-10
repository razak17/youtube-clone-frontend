import { AxiosError } from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
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
import { useNavigate } from 'react-router-dom';
import { useMe } from '../context/me';

const Login = () => {
	const [formData, setFormData] = useState({
		email: 'bo@email.com',
		password: 'cruzmissile'
	});
	const navigate = useNavigate();
	const { user, refetch } = useMe();

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
			navigate('/', { replace: true });
			refetch();
		}
	});

	const handleLogin = () => {
		console.log(formData);
		mutation.mutate(formData);
	};

	return (
		<StyledContainer>
			<StyledSection>
				<StyledTitle>
					<h1>Login</h1>
				</StyledTitle>

				<StyledSubTitle>sign in to continue</StyledSubTitle>
				<StyledInput
					name='email'
					placeholder='Email'
          value={formData.email}
					onChange={handleChangeInput}
				/>
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
			</StyledSection>
		</StyledContainer>
	);
};

export default Login;
