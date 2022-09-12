import styled from 'styled-components';
import { Comment as CommentType, QueryKeys } from '../types';
import { format } from 'timeago.js';
import { getUser } from '../lib/api';
import { useQuery } from 'react-query';

const StyledCOntainer = styled.div`
	display: flex;
	gap: 10px;
	margin: 30px 0px;
`;

const StyledAvatar = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;

const StyledDetails = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	color: ${({ theme }) => theme.text};
`;
const StyledName = styled.span`
	font-size: 13px;
	font-weight: 500;
`;

const StyledDate = styled.span`
	font-size: 12px;
	font-weight: 400;
	color: ${({ theme }) => theme.textSoft};
	margin-left: 5px;
`;

const StyledText = styled.span`
	font-size: 14px;
`;

const Comment = ({ comment }: { comment: CommentType }) => {
	const { data: commentOwner } = useQuery([QueryKeys.COMMENT_OWNER, comment.videoId], () => getUser(comment.owner));
	return (
		<StyledCOntainer>
			<StyledAvatar src={commentOwner?.profilePic} />
			<StyledDetails>
				<StyledName>
					{commentOwner?.username} <StyledDate>{format(comment?.createdAt.toString())}</StyledDate>
				</StyledName>
				<StyledText>{comment.description}</StyledText>
			</StyledDetails>
		</StyledCOntainer>
	);
};

export default Comment;
