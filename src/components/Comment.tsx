import styled from 'styled-components';
import { videoURLs } from '../data';

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

const Comment = () => {
	return (
		<StyledCOntainer>
			<StyledAvatar src={videoURLs[2]} />
			<StyledDetails>
				<StyledName>
					John Doe <StyledDate>1 day ago</StyledDate>
				</StyledName>
				<StyledText>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, ex
					laboriosam ipsam aliquam voluptatem perferendis provident modi, sequi
					tempore reiciendis quod, optio ullam cumque? Quidem numquam sint mollitia
					totam reiciendis?
				</StyledText>
			</StyledDetails>
		</StyledCOntainer>
	);
};

export default Comment;
