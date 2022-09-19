import { AxiosError } from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { login } from '../lib/api';
import GoogleLogin from './GoogleLogin';
import { QueryKeys } from '../types';
import { Input, StyledInput } from '../components/Input';
import { Form } from '../components/Form';
import Button from '../components/Button';

export const FormSchema = z.object({
	email: z.string().email('Please enter a valid email address.'),
	password: z
		.string()
		.min(6, 'Please choose a longer password')
		.max(256, 'Consider using a short password')
});

type FormSchemaType = z.infer<typeof FormSchema>;

const Login = () => {
	const navigate = useNavigate();
	const state = useLocation();
	const queryClient = useQueryClient();

	const mutation = useMutation<string, AxiosError, Parameters<typeof login>['0']>(login, {
		onSuccess: () => {
			navigate(state.state || '/', { replace: true });
			queryClient.invalidateQueries([QueryKeys.ME]);
		}
	});

	const {
		register: loginForm,
		watch,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema)
	});

	const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
		console.log(data);
		// mutation.mutate(formData);
	};

	return (
		<Form type='login'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type='email'
					disabled={isSubmitting || mutation.isLoading}
					placeholder='Email'
					{...loginForm('email')}
					error={errors.email}
				/>
				<Input
					type='password'
					disabled={isSubmitting || mutation.isLoading}
					placeholder='Password'
					{...loginForm('password')}
					error={errors.password}
				/>
				<Button
					disabled={isSubmitting || mutation.isLoading}
					text={isSubmitting || mutation.isLoading ? 'Logging in' : 'Login'}
				/>
			</form>
		</Form>
	);
};

export default Login;
