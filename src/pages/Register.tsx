import { AxiosError } from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../lib/api';
import { QueryKeys } from '../types';

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
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
	h1 {
		font-size: 24px;
	}
`;

export const StyledSubTitle = styled.h2`
	font-size: 14px;
	font-weight: 300;
	margin-bottom: 12px;
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
	font-size: 14px;
	a {
		text-decoration: none;
		color: ${({ theme }) => theme.blue};
	}
`;

const Register = () => {
	const [formData, setFormData] = useState({
		username: 'bob',
		email: 'bob@email.com',
		password: 'bobishere',
		confirmPassword: 'bobishere'
	});
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const mutation = useMutation<string, AxiosError, Parameters<typeof register>['0']>(register, {
		onSuccess: () => {
			navigate('/login', { replace: true });
			queryClient.invalidateQueries([QueryKeys.ME]);
		}
	});

	const handleRegister = () => {
		mutation.mutate(formData);
	};

	return (
		<StyledContainer>
			<StyledSection>
				<StyledTitle>
					<h1>Register</h1>
				</StyledTitle>
				<StyledSubTitle>sign up to get started</StyledSubTitle>
				<StyledInput name='username' placeholder='Username' value={formData.username} onChange={handleChangeInput} />
				<StyledInput type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChangeInput} />
				<StyledInput
					type='password'
					name='password'
					placeholder='Password'
					value={formData.password}
					onChange={handleChangeInput}
				/>
				<StyledInput
					type='password'
					name='confirmPassword'
					value={formData.confirmPassword}
					placeholder='Confirm Password'
					onChange={handleChangeInput}
				/>
				<StyledButton onClick={handleRegister}>Register</StyledButton>
				<StyledSpan>
					already registered? <Link to='/login'>login</Link>
				</StyledSpan>
			</StyledSection>
		</StyledContainer>
	);
};

export default Register;
