import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { login } from '../lib/api';
import GoogleLogin from './GoogleLogin';
import { QueryKeys } from '../types';
import { Error, Input } from '../components/Input';
import { Form } from '../components/Form';
import Button from '../components/Button';

export const FormSchema = z.object({
	email: z.string().email('Please enter a valid email address.'),
	password: z
		.string()
		.min(6, 'Password has to be at least 6 characters long.')
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
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema)
	});

	const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
		console.log(data);
		mutation.mutate(data);
		console.log({ mutation });
	};

	return (
		<Form type='login'>
			<form onSubmit={handleSubmit(onSubmit)}>
				{(mutation?.error?.response?.data as string) ? (
					<Error error={mutation?.error?.response?.data as string} />
				) : null}
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
			<GoogleLogin />
		</Form>
	);
};

export default Login;
