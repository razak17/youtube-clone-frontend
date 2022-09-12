import { AxiosError } from 'axios';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useMe } from '../context/me';
import { addComment, getComments } from '../lib/api';
import { QueryKeys } from '../types';
import Comment from './Comment';

const StyledContainer = styled.div``;

const StyledNewComment = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const StyledAvatar = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;

const StyledInput = styled.input`
	border: none;
	border-bottom: 1px solid ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.text};
	background-color: transparent;
	outline: none;
	padding: 5px;
	width: 100%;
`;

const StyledButton = styled.button`
	background-color: #cc1a00;
	padding: 6px 16px;
	background-color: #cc1a00;
	font-weight: 500;
	color: white;
	border: none;
	border-radius: 3px;
	height: max-content;
	cursor: pointer;
`;

const Comments = ({ videoId }: { videoId: string }) => {
	const [commentDescription, setCommentDescription] = useState('');

	const { user } = useMe();
	const queryClient = useQueryClient();

	const { data: comments } = useQuery([QueryKeys.COMMENTS, videoId], () =>
		getComments(videoId)
	);

	const mutation = useMutation<string, AxiosError, Parameters<typeof addComment>['0']>(addComment, {
		onSuccess: () => {
			queryClient.invalidateQueries([QueryKeys.COMMENTS, videoId]);
			setCommentDescription('');
		}
	});

	const handleSubmit = () => {
		if (commentDescription.trim() !== '') mutation.mutate({ description: commentDescription, videoId });
	};

	return (
		<StyledContainer>
			{user && (
				<StyledNewComment>
					<StyledAvatar src={user.profilePic} />
					<StyledInput
						name='comment'
						value={commentDescription}
						onChange={(e) => setCommentDescription(e.target.value)}
						placeholder='Type something...'
					/>
					<StyledButton onClick={handleSubmit}>Submit</StyledButton>
				</StyledNewComment>
			)}
			{comments?.map((comment) => (
				<Comment key={comment._id} comment={comment} />
			))}
		</StyledContainer>
	);
};

export default Comments;
