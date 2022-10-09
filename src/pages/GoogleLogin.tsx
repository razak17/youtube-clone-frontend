import styled from 'styled-components';
import { auth, provider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { googleLogin } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import { QueryKeys } from '../types';

export const StyledBtn = styled.button`
	border-radius: 3px;
	border: none;
  width: 100%;
	margin-top: 14px;
	padding: 10px 24px;
	font-weight: 500;
	font-size: 14px;
	cursor: pointer;
	background-color: ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.textSoft};
`;

const GoogleLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const mutation = useMutation<string, AxiosError, Parameters<typeof googleLogin>['0']>(
		googleLogin,
		{
			onSuccess: () => {
				navigate('/', { replace: true });
			  queryClient.invalidateQueries([QueryKeys.ME]);
			}
		}
	);

	const handleGoogleLogin = async () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				mutation.mutate({
					username: result.user.displayName as string,
					email: result.user.email as string,
					profilePic: result.user.photoURL as string
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};
	return <StyledBtn onClick={handleGoogleLogin}>Continue with Google</StyledBtn>;
};

export default GoogleLogin;
