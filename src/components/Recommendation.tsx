import { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getRecommendations } from '../lib/api';
import { QueryKeys } from '../types';
import Card from './Card';
import { SidebarProps } from './Sidebar';

export const StyledRecommendation = styled.div<SidebarProps>`
	color: ${({ theme }) => theme.text};
	margin-left: 18px;
	width: 35%;
	display: flex;
	flex-direction: column;
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
	const { data: videos } = useQuery([QueryKeys.RECOMMENDATIONS, videoPath], () => getRecommendations(tags.toString()));

	return (
		<StyledRecommendation sidebarOpen={sidebarOpen}>
			<h3>Recommendations</h3>
			<StyledInner>
				{/* eslint-disable-next-line max-len */}
				{videos && videos.map((video) => <Card type='sm' key={video._id} video={video} ownerId={video.owner} />)}
			</StyledInner>
		</StyledRecommendation>
	);
};

export default Recommendation;
