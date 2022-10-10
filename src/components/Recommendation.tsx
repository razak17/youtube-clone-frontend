import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getRecommendations } from '../lib/api';
import { QueryKeys, Video } from '../types';
import { SidebarProps } from './Sidebar';
import Card from './Card';
import Loader from './Loader';

export const StyledRecommendation = styled.div<SidebarProps>`
	color: ${({ theme }) => theme.text};
	margin-left: 18px;
	width: 35%;
	display: flex;
	flex-direction: column;
	@media (max-width: 1080px) {
		display: none;
	}
`;

export const StyledInner = styled.div`
	margin-top: 18px;
`;

const Recommendation = ({
	video,
	tags,
	sidebarOpen,
	videoPath
}: {
	video: Video;
	tags: string[];
	sidebarOpen: boolean;
	videoPath: string;
}) => {
	/* eslint-disable-next-line max-len */
	const { data: videos, isLoading } = useQuery([QueryKeys.RECOMMENDATIONS, videoPath], () =>
		getRecommendations(tags.toString())
	);

	if (isLoading) <Loader />;

	const filteredVideos = videos ? videos?.filter((v) => v._id !== video._id) : null;

	if (!filteredVideos) <h3>No recommendations founds</h3>;

	return (
		<StyledRecommendation sidebarOpen={sidebarOpen}>
			<h3>Recommendations</h3>
			<StyledInner>
				{filteredVideos &&
					/* eslint-disable-next-line max-len */
					filteredVideos.map((video) => (
						<Card type='sm' key={video._id} video={video} ownerId={video.owner} />
					))}
			</StyledInner>
		</StyledRecommendation>
	);
};

export default Recommendation;
