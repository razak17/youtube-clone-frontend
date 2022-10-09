import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getRecommendations } from '../lib/api';
import { QueryKeys } from '../types';
import { SidebarProps } from './Sidebar';
import Card from './Card';

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
	tags,
	sidebarOpen,
	videoPath
}: {
	tags: string[];
	sidebarOpen: boolean;
	videoPath: string;
}) => {
	/* eslint-disable-next-line max-len */
	const { data: videos } = useQuery([QueryKeys.RECOMMENDATIONS, videoPath], () =>
		getRecommendations(tags.toString())
	);

	return (
		<StyledRecommendation sidebarOpen={sidebarOpen}>
			<h3>Recommendations</h3>
			<StyledInner>
				{videos &&
					/* eslint-disable-next-line max-len */
					videos.map((video) => <Card type='sm' key={video._id} video={video} ownerId={video.owner} />)}
			</StyledInner>
		</StyledRecommendation>
	);
};

export default Recommendation;
