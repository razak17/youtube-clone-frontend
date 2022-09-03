import styled from 'styled-components';
import { videoURLs } from '../data';
import StyledComment from './Comment';

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

const Comments = () => {
	return (
		<StyledContainer>
			<StyledNewComment>
				<StyledAvatar src={videoURLs[2]} />
				<StyledInput placeholder='Add a comment...' />
			</StyledNewComment>
			<StyledComment />
			<StyledComment />
			<StyledComment />
			<StyledComment />
			<StyledComment />
			<StyledComment />
			<StyledComment />
		</StyledContainer>
	);
};

export default Comments;
