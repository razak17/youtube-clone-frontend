import styled from 'styled-components';
import Card from '../components/Card';
import { useQuery } from 'react-query';

import { QueryKeys } from '../types';
import { getVideos } from '../lib/api';

const StyledContianer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const Home = () => {
	const { data: videos } = useQuery(QueryKeys.videos, getVideos, {
		initialData: []
	});
	console.log('videos', videos);

	return (
		<StyledContianer>
			{(videos || []).map((video) => {
				return <Card key={video._id} video={video} />;
			})}
		</StyledContianer>
	);
};

export default Home;
