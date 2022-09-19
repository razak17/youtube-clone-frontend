import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Error, Input } from '../components/Input';
import { register } from '../lib/api';
import { QueryKeys } from '../types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../components/Form';
import Button from '../components/Button';

export const FormSchema = z
	.object({
		username: z.string().min(2, 'Username must be atleast 2 characters long'),
		email: z.string().email('Please enter a valid email address.'),
		password: z
			.string()
			.min(6, 'Please choose a longer password')
			.max(256, 'Consider using a short password'),
		confirmPassword: z
			.string()
			.min(6, 'Please choose a longer password')
			.max(256, 'Consider using a short password')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'passwords do not match',
		path: ['confirmPassword']
	});

type FormSchemaType = z.infer<typeof FormSchema>;

const Register = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const mutation = useMutation<string, AxiosError, Parameters<typeof register>['0']>(register, {
		onSuccess: () => {
			navigate('/login', { replace: true });
			queryClient.invalidateQueries([QueryKeys.ME]);
		}
	});

	const {
		register: registerForm,
		watch,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema)
	});

	const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
		mutation.mutate(data);
	};

	return (
		<Form type='Register'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Error error={mutation?.error?.response?.data as string} />
				<Input
					type='text'
					disabled={isSubmitting || mutation.isLoading}
					placeholder='Username'
					{...registerForm('username')}
					error={errors.username}
				/>
				<Input
					type='email'
					disabled={isSubmitting || mutation.isLoading}
					placeholder='Email'
					{...registerForm('email')}
					error={errors.email}
				/>
				<Input
					type='password'
					disabled={isSubmitting || mutation.isLoading}
					placeholder='Password'
					{...registerForm('password')}
					error={errors.password}
				/>
				<Input
					type='password'
					disabled={isSubmitting || mutation.isLoading}
					placeholder='Confirm Password'
					{...registerForm('confirmPassword')}
					error={errors.confirmPassword}
				/>
				<Button
					disabled={isSubmitting || mutation.isLoading}
					text={isSubmitting || mutation.isLoading ? 'Submitting' : 'Register'}
				/>
			</form>
		</Form>
	);
};

export default Register;
