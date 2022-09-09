import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { videoURLs } from '../data';
import { FC } from '../main';
import { Video } from '../types';

const StyledContainer = styled.div`
	width: ${(props) => props.itemType !== 'sm' && '250px'};
	margin-bottom: ${(props) => (props.itemType === 'sm' ? '10px' : '45px')};
	cursor: pointer;
	display: ${(props) => props.itemType === 'sm' && 'flex'};
	gap: 10px;
`;

const StyledImage = styled.img`
	width: 100%;
	height: ${(props) => (props.itemType === 'sm' ? '100px' : '140px')};
	background-color: #999;
	flex: 1;
`;

const StyledDetails = styled.div`
	display: flex;
	margin-top: ${(props) => props.itemType !== 'sm' && '8px'};
	gap: 12px;
	flex: 1;
`;

const StyledChannelImage = styled.img`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background-color: #999;
	display: ${(props) => props.itemType === 'sm' && 'none'};
`;

const StyledTexts = styled.div`
	padding: 0;
`;

const StyledTitle = styled.h1`
	font-size: 14px;
	color: ${({ theme }) => theme.text};
	margin: 0;
	padding: 0 0 6px 0;
`;

const StyledChannelName = styled.h2`
	font-size: 14px;
	color: ${({ theme }) => theme.textSoft};
	margin: 0;
	padding: 0 0 6px 0;
`;

const StyledInfo = styled.div`
	font-size: 12px;
	color: ${({ theme }) => theme.textSoft};
`;

const Card: FC<{ type?: string; video: Video }> = ({ type, video }) => {
	return (
		<Link to='/video/test' style={{ textDecoration: 'none' }}>
			<StyledContainer itemType={type}>
				<StyledImage itemType={type} src={videoURLs[1]} />
				<StyledDetails itemType={type}>
					<StyledChannelImage itemType={type} src={videoURLs[2]} />
					<StyledTexts>
						<StyledTitle>{video.title}</StyledTitle>
						<StyledChannelName>Lama Dev</StyledChannelName>
						<StyledInfo>
							<>
								{video.views} views • {video.createdAt}
							</>
						</StyledInfo>
					</StyledTexts>
				</StyledDetails>
			</StyledContainer>
		</Link>
	);
};

export default Card;
