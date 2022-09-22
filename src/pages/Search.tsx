import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card';
import { videoSearch } from '../lib/api';
import { QueryKeys } from '../types';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	h2 {
		color: ${({ theme }) => theme.text};
	}
`;

const Wrapper = styled.div`
	margin-top: 8px;
	display: flex;
	gap: 24px;
	flex-wrap: wrap;
`;

const Search = () => {
	const query = useLocation().search;

	const { data: videos } = useQuery([QueryKeys.SEARCH, query], () => videoSearch(query));

	return (
		<Container>
			{videos && videos.length ? (
				<>
					<h2>Search results: {query.split('=')[1]}</h2>
					{/* eslint-disable-next-line max-len */}
					<Wrapper>
						{videos &&
							videos.map((video) => <Card key={video._id} video={video} ownerId={video.owner} />)}
					</Wrapper>
				</>
			) : (
				<h2>No results: {query.split('=')[1]}</h2>
			)}
		</Container>
	);
};

export default Search;
