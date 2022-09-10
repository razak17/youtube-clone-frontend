import styled from 'styled-components';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import Comments from '../components/Comments';
import Card from '../components/Card';
import { videoURLs } from '../data';

const StyledContainer = styled.div`
	display: flex;
	gap: 24px;
`;

const StyledContent = styled.div`
	flex: 5;
`;

const StyledVideoWrapper = styled.div``;

const StyledTitle = styled.h1`
	font-size: 18px;
	font-weight: 400;
	margin-top: 20px;
	margin-bottom: 10px;
	color: ${({ theme }) => theme.text};
`;

const StyledDetails = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const StyledInfo = styled.span`
	color: ${({ theme }) => theme.textSoft};
`;

const StyledButtons = styled.div`
	display: flex;
	gap: 20px;
	color: ${({ theme }) => theme.text};
`;

const StyledButton = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	cursor: pointer;
`;

const StyledHr = styled.hr`
	margin: 15px 0px;
	border: 0.5px solid ${({ theme }) => theme.soft};
`;

const StyledRecommendation = styled.div`
	flex: 2;
`;
const StyledChannel = styled.div`
	display: flex;
	justify-content: space-between;
`;

const StyledChannelInfo = styled.div`
	display: flex;
	gap: 20px;
`;

const StyledImage = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;

const StyledChannelDetail = styled.div`
	display: flex;
	flex-direction: column;
	color: ${({ theme }) => theme.text};
`;

const StyledChannelName = styled.span`
	font-weight: 500;
`;

const StyledChannelCounter = styled.span`
	margin-top: 5px;
	margin-bottom: 20px;
	color: ${({ theme }) => theme.textSoft};
	font-size: 12px;
`;

const StyledDescription = styled.p`
	font-size: 14px;
`;

const StyledSubscribe = styled.button`
	background-color: #cc1a00;
	font-weight: 500;
	color: white;
	border: none;
	border-radius: 3px;
	height: max-content;
	padding: 10px 20px;
	cursor: pointer;
`;

const Video = () => {
	return (
		<StyledContainer>
			<StyledContent>
				<StyledVideoWrapper>
					<iframe
						width='100%'
						height='480'
						src='https://www.youtube.com/embed/k3Vfj-e1Ma4'
						title='YouTube video player'
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
					></iframe>
				</StyledVideoWrapper>
				<StyledTitle>Test Video</StyledTitle>
				<StyledDetails>
					<StyledInfo>7,948,154 views • Jun 22, 2022</StyledInfo>
					<StyledButtons>
						<StyledButton>
							<ThumbUpOutlinedIcon /> 123
						</StyledButton>
						<StyledButton>
							<ThumbDownOffAltOutlinedIcon /> Dislike
						</StyledButton>
						<StyledButton>
							<ReplyOutlinedIcon /> Share
						</StyledButton>
						<StyledButton>
							<AddTaskOutlinedIcon /> Save
						</StyledButton>
					</StyledButtons>
				</StyledDetails>
				<StyledHr />
				<StyledChannel>
					<StyledChannelInfo>
						<StyledImage src={videoURLs[2]} />
						<StyledChannelDetail>
							<StyledChannelName>Lama Dev</StyledChannelName>
							<StyledChannelCounter>200K subscribers</StyledChannelCounter>
							<StyledDescription>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus laborum delectus unde quaerat dolore culpa
								sit aliquam at. Vitae facere ipsum totam ratione exercitationem. Suscipit animi accusantium dolores ipsam ut.
							</StyledDescription>
						</StyledChannelDetail>
					</StyledChannelInfo>
					<StyledSubscribe>SUBSCRIBE</StyledSubscribe>
				</StyledChannel>
				<StyledHr />
				<Comments />
			</StyledContent>
			<StyledRecommendation>
				<Card type='sm' />
				<Card type='sm' />
				<Card type='sm' />
				<Card type='sm' />
				<Card type='sm' />
				<Card type='sm' />
				<Card type='sm' />
				<Card type='sm' />
				<Card type='sm' />
				<Card type='sm' />
				<Card type='sm' />
				<Card type='sm' />
				<Card type='sm' />
			</StyledRecommendation>
		</StyledContainer>
	);
};

export default Video;
