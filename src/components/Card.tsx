import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FC } from '../main';
import { QueryKeys, Video } from '../types';
import { format } from 'timeago.js';
import { getUser } from '../lib/api';
import { useQuery } from 'react-query';

const StyledContainer = styled.div<{ cardSize?: string }>`
	width: ${(props) => props.cardSize !== 'sm' && '240px'};
	height: 240px;
	margin-bottom: ${(props) => (props.cardSize === 'sm' ? '10px' : '45px')};
	cursor: pointer;
	display: ${(props) => props.cardSize === 'sm' && 'flex'};
	gap: 10px;
	@media (max-width: 768px) {
		width: 300px;
	}
`;

const StyledImage = styled.img<{ cardSize?: string }>`
	width: 100%;
	height: ${(props) => (props.cardSize === 'sm' ? '100px' : '160px')};
	background-color: #999;
	flex: 1;
`;

const StyledDetails = styled.div<{ cardSize?: string }>`
	display: flex;
	margin-top: ${(props) => props.cardSize !== 'sm' && '8px'};
	gap: 12px;
	flex: 1;
`;

const StyledChannelImage = styled.img<{ cardSize?: string }>`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background-color: #999;
	display: ${(props) => props.cardSize === 'sm' && 'none'};
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

const Card: FC<{ type?: string; video: Video; ownerId: string }> = ({ type, video, ownerId }) => {
	const { data: owner } = useQuery([QueryKeys.VIDEO_OWNER, ownerId], () => getUser(ownerId));

	return (
		<Link to={`/watch/${video._id}`} style={{ textDecoration: 'none' }}>
			<StyledContainer cardSize={type}>
				<StyledImage cardSize={type} src={video.thumbnailUrl} />
				<StyledDetails cardSize={type}>
					<StyledChannelImage cardSize={type} src={owner?.profilePic} />
					<StyledTexts>
						<StyledTitle>{video.title}</StyledTitle>
						<StyledChannelName>{owner?.username}</StyledChannelName>
						<StyledInfo>
							<span>
								{/* eslint-disable max-len */}
								{video.views === 0 ? 'No' : video.views} {video.views === 1 ? 'view' : 'views'} •{' '}
								{format(video.createdAt.toString())}
							</span>
						</StyledInfo>
					</StyledTexts>
				</StyledDetails>
			</StyledContainer>
		</Link>
	);
};

export default Card;
