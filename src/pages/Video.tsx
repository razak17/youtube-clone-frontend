import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { format } from 'timeago.js';
import { AxiosError } from 'axios';
import styled from 'styled-components';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { QueryKeys } from '../types';
import { useMe } from '../context/me';
import {
	dislikeVideo,
	getVideo,
	getVideoOwner,
	likeVideo,
	subscribe,
	unsubscribe
} from '../lib/api';
import { useMainContext } from '../context';
import { SidebarProps } from '../components/Sidebar';
import Comments from '../components/Comments';
import Recommendation, { StyledRecommendation } from '../components/Recommendation';

const StyledContainer = styled.div`
	background-color: ${({ theme }) => theme.bg};
	display: flex;
	height: 100%;
	flex-direction: column;
`;

const StyledWrapper = styled.div<SidebarProps>`
	display: flex;
`;

const StyledContent = styled.div<SidebarProps>`
	width: 100%;
`;

const StyledVideoWrapper = styled.div`
	max-height: 720px;
`;

const StyledVideoFrame = styled.video<SidebarProps>`
	width: 100%;
	height: 480px;
	object-fit: cover;
`;

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

const StyledSubscribe = styled.button<{ subscribed: boolean }>`
	background-color: ${({ theme, subscribed }) => (subscribed ? theme.textSoft : theme.red)};
	color: ${({ theme, subscribed }) => (subscribed ? theme.dark : theme.soft)};
	font-weight: 500;
	border: none;
	border-radius: 3px;
	height: max-content;
	padding: 10px 20px;
	cursor: pointer;
`;

const Video = () => {
	const { user } = useMe();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const path = useLocation().pathname;
	const videoPath = path.split('/')[2];
	const { sidebarOpen } = useMainContext();

	const { data: video } = useQuery([QueryKeys.CURRENT_VIDEO, videoPath], () => getVideo(videoPath));

	const { data: owner } = useQuery([QueryKeys.CURRENT_VIDEO_OWNER], () => getVideoOwner(videoPath));

	const likeMutation = useMutation<string, AxiosError, Parameters<typeof likeVideo>['0']>(
		likeVideo,
		{
			onSuccess: () => {
				queryClient.invalidateQueries([QueryKeys.CURRENT_VIDEO]);
			}
		}
	);

	const dislikeMutation = useMutation<string, AxiosError, Parameters<typeof dislikeVideo>['0']>(
		dislikeVideo,
		{
			onSuccess: () => {
				queryClient.invalidateQueries([QueryKeys.CURRENT_VIDEO]);
			}
		}
	);

	const subscribeMutation = useMutation<string, AxiosError, Parameters<typeof subscribe>['0']>(
		subscribe,
		{
			onSuccess: () => {
				queryClient.invalidateQueries([QueryKeys.CURRENT_VIDEO_OWNER]);
			}
		}
	);

	const unsubscribeMutation = useMutation<string, AxiosError, Parameters<typeof unsubscribe>['0']>(
		unsubscribe,
		{
			onSuccess: () => {
				queryClient.invalidateQueries([QueryKeys.CURRENT_VIDEO_OWNER]);
			}
		}
	);

	const handleLike = () => {
		if (!user) navigate('/login');
		user && likeMutation.mutate(video?._id as string);
	};

	const handleDislike = () => {
		if (!user) navigate('/login');
		user && dislikeMutation.mutate(video?._id as string);
	};

	const handleSubscribe = () => {
		if (!user) {
			navigate('/login', { state: path });
			return;
		}
		owner?.subscribers?.includes(user?._id as string)
			? unsubscribeMutation.mutate(owner?._id as string)
			: subscribeMutation.mutate(owner?._id as string);
	};

	// https://www.youtube.com/embed/k3Vfj-e1Ma4
	console.log('ttt', video?.tags);
	return (
		<>
			<StyledContainer>
				<StyledWrapper sidebarOpen={sidebarOpen}>
					<StyledContent sidebarOpen={sidebarOpen}>
						<StyledVideoWrapper>
							<StyledVideoFrame src={video?.videoUrl} sidebarOpen={sidebarOpen} controls />
						</StyledVideoWrapper>
						<StyledTitle>{video?.title}</StyledTitle>
						<StyledDetails>
							<StyledInfo>
								<span>
									{/* eslint-disable-next-line max-len */}
									{video?.views === 0 ? 'No' : video?.views} {video?.views === 1 ? 'view' : 'views'} •{' '}
									{format(video?.createdAt?.toString() as string)}
								</span>
							</StyledInfo>
							<StyledButtons>
								<StyledButton onClick={handleLike}>
									{/* eslint-disable-next-line max-len */}
									{video?.likes?.includes(user?._id as string) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
									{video?.likes?.length}
								</StyledButton>
								<StyledButton onClick={handleDislike}>
									{/* eslint-disable-next-line max-len */}
									{video?.dislikes?.includes(user?._id as string) ? (
										<ThumbDownIcon />
									) : (
										<ThumbDownOffAltOutlinedIcon />
									)}
									{video?.dislikes?.length}
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
								<StyledImage src={owner?.profilePic} />
								<StyledChannelDetail>
									<StyledChannelName>{owner?.username}</StyledChannelName>
									<StyledChannelCounter>
										<span>
											{owner?.subscribers?.length === 0 ? 'No' : owner?.subscribers?.length}{' '}
											{owner?.subscribers?.length === 1 ? 'subscriber' : 'subscribers'}
										</span>
									</StyledChannelCounter>
									<StyledDescription>{video?.description}</StyledDescription>
								</StyledChannelDetail>
							</StyledChannelInfo>
							{owner?._id !== user?._id && (
								<StyledSubscribe
									onClick={handleSubscribe}
									subscribed={owner?.subscribers?.includes(user?._id as string) as boolean}
								>
									{owner?.subscribers?.includes(user?._id as string) ? 'SUBSCRIBED' : 'SUBSCRIBE'}
								</StyledSubscribe>
							)}
						</StyledChannel>
						<StyledHr />
						<Comments videoId={videoPath} />
					</StyledContent>
					{video && video.tags?.length ? (
						/* eslint-disable-next-line max-len */
						<Recommendation
							tags={video?.tags as string[]}
							sidebarOpen={sidebarOpen}
							videoPath={videoPath}
						/>
					) : (
						<StyledRecommendation sidebarOpen={sidebarOpen}>
							<h3>No Recommendations</h3>
						</StyledRecommendation>
					)}
				</StyledWrapper>
			</StyledContainer>
		</>
	);
};

export default Video;
