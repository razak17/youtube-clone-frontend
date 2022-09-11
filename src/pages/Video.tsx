import styled from 'styled-components';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Comments from '../components/Comments';
import Card from '../components/Card';
import { useLocation } from 'react-router-dom';
import { QueryKeys } from '../types';
import { dislikeVideo, getUser, getVideo, likeVideo, subscribe, unsubscribe } from '../lib/api';
import { useMutation, useQuery } from 'react-query';
import { useMe } from '../context/me';
import { format } from 'timeago.js';
import { AxiosError } from 'axios';

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
	const { user } = useMe();
	const { CURRENT_VIDEO, CURRENT_VIDEO_OWNER } = QueryKeys;
	const path = useLocation().pathname.split('/')[2];

	const {
		data: video,
		isLoading: videoLoading,
		refetch: videoRefetch
	} = useQuery([CURRENT_VIDEO], () => getVideo(path));
	/* eslint-disable-next-line max-len */
	const {
		data: owner,
		isLoading: ownerLoading,
		refetch: ownerRefetch
	} = useQuery([CURRENT_VIDEO_OWNER], () => getUser(video?.owner as string));
	console.log('owner', owner);
	console.log('path', path);
	console.log('cvideo', video);

	const likeMutation = useMutation<string, AxiosError, Parameters<typeof likeVideo>['0']>(likeVideo, {
		onSuccess: () => {
			videoRefetch && videoRefetch();
			// ownerRefetch && ownerRefetch();
		}
	});

	const dislikeMutation = useMutation<string, AxiosError, Parameters<typeof dislikeVideo>['0']>(dislikeVideo, {
		onSuccess: () => {
			videoRefetch && videoRefetch();
		}
	});

	const subscribeMutation = useMutation<string, AxiosError, Parameters<typeof subscribe>['0']>(subscribe, {
		onSuccess: () => {
			ownerRefetch && ownerRefetch();
		}
	});

	const unsubscribeMutation = useMutation<string, AxiosError, Parameters<typeof unsubscribe>['0']>(unsubscribe, {
		onSuccess: () => {
			ownerRefetch && ownerRefetch();
		}
	});

	const handleSubscribe = () => {
		user?.subscriptions?.includes(owner?._id as string)
			? subscribeMutation.mutate(owner?._id as string)
			: unsubscribeMutation.mutate(owner?._id as string);
	};

	// https://www.youtube.com/embed/k3Vfj-e1Ma4

	if (ownerLoading || videoLoading) {
		return <p>Loading...</p>;
	}

	return (
		<StyledContainer>
			<StyledContent>
				<StyledVideoWrapper>
					<iframe
						width='100%'
						height='400'
						src=''
						title='YouTube video player'
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
					></iframe>
				</StyledVideoWrapper>
				<StyledTitle>{video?.title}</StyledTitle>
				{video && (
					<StyledDetails>
						<StyledInfo>
							<span>
								{video.views === 0 ? 'No' : video.views} {video.views === 1 ? 'view' : 'views'} •{' '}
								{format(video?.createdAt.toString())}
							</span>
						</StyledInfo>
						<StyledButtons>
							<StyledButton onClick={() => likeMutation.mutate(video._id as string)}>
								{/* eslint-disable-next-line max-len */}
								{video.likes.includes(owner?._id as string) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
								{video.likes.length}
							</StyledButton>
							<StyledButton onClick={() => dislikeMutation.mutate(video._id as string)}>
								{video.dislikes.includes(owner?._id as string) ? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon />}
								{video.dislikes.length}
							</StyledButton>
							<StyledButton>
								<ReplyOutlinedIcon /> Share
							</StyledButton>
							<StyledButton>
								<AddTaskOutlinedIcon /> Save
							</StyledButton>
						</StyledButtons>
					</StyledDetails>
				)}
				<StyledHr />
				{owner && (
					<StyledChannel>
						<StyledChannelInfo>
							<StyledImage src={owner.profilePic} />
							<StyledChannelDetail>
								<StyledChannelName>{owner.username}</StyledChannelName>
								<StyledChannelCounter>
									<span>
										{owner.subscriberCount === 0 ? 'No' : owner.subscriberCount}{' '}
										{owner.subscriberCount === 1 ? 'subscriber' : 'subscribers'}
									</span>
								</StyledChannelCounter>
								<StyledDescription>{video?.description}</StyledDescription>
							</StyledChannelDetail>
						</StyledChannelInfo>
						{owner._id !== user?._id && (
							<StyledSubscribe onClick={handleSubscribe} disabled={owner._id === user?._id}>
								{user?.subscriptions?.includes(owner._id as string) ? 'SUBSCRIBED' : 'SUBSCRIBE'}
							</StyledSubscribe>
						)}
					</StyledChannel>
				)}
				<StyledHr />
				<Comments />
			</StyledContent>
			<StyledRecommendation></StyledRecommendation>
		</StyledContainer>
	);
};

export default Video;
