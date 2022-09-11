import styled from 'styled-components';
import Card from '../components/Card';
import { useQuery } from 'react-query';

import { QueryKeys, VideoType } from '../types';
import { getVideos } from '../lib/api';
import { FC } from '../main';

const StyledContianer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const Home: FC<{ type: VideoType }> = ({ type }) => {
	const { data: videos } = useQuery([QueryKeys.VIDEOS, type], () => getVideos(type), {
		initialData: []
	});

	return (
		<StyledContianer>
			{videos?.length &&
				videos.map((video) => {
					return <Card key={video._id} video={video} ownerId={video.owner} />;
				})}
		</StyledContianer>
	);
};

export default Home;
