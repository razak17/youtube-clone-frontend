import { AxiosError } from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../lib/api';

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	 {
		/* justify-content: center; */
	}
	height: calc(100vh - 56px);
	color: ${({ theme }) => theme.text};
	padding-top: 48px;
`;

export const StyledSection = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 250px;
	border-radius: 3px;
	background-color: ${({ theme }) => theme.bgLighter};
	border: 1px solid ${({ theme }) => theme.soft};
	padding: 20px 50px;
	gap: 10px;
`;

export const StyledTitle = styled.div`
	margin-bottom: 18px;
	h1 {
		font-size: 24px;
	}
`;

export const StyledInput = styled.input`
	border: 1px solid ${({ theme }) => theme.soft};
	border-radius: 3px;
	padding: 10px;
	background-color: transparent;
	width: 100%;
	outline: none;
	color: ${({ theme }) => theme.text};
`;

export const StyledButton = styled.button`
	border-radius: 3px;
	border: none;
	padding: 10px 24px;
	font-weight: 500;
	font-size: 14px;
	cursor: pointer;
	background-color: ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.textSoft};
`;

export const StyledSpan = styled.div`
	padding-top: 12px;
	font-size: 12px;
	a {
		text-decoration: none;
		color: ${({ theme }) => theme.blue};
	}
`;
const Register = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

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
		Parameters<typeof register>['0']
	>(register);

	return (
		<StyledSection>
			<StyledTitle>
				<h1>Register</h1>
			</StyledTitle>
			<StyledInput
				name='username'
				placeholder='Username'
				onChange={handleChangeInput}
			/>
			<StyledInput name='email' placeholder='Email' onChange={handleChangeInput} />
			<StyledInput
				name='password'
				type='password'
				placeholder='Password'
				onChange={handleChangeInput}
			/>
			<StyledInput
				name='confirmPassword'
				type='password'
				placeholder='Confirm Password'
				onChange={handleChangeInput}
			/>
			<StyledButton onSubmit={() => mutation.mutate(formData)}>
				Register
			</StyledButton>
			<StyledSpan>
				already registered? <Link to='/login'>login</Link>
			</StyledSpan>
		</StyledSection>
	);
};

export default Register;
