import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { videoSearch } from '../lib/api';
import { QueryKeys } from '../types';

const Container = styled.div`
	display: flex;
	padding: 0 18px;
	flex-direction: column;
	height: 100vh;
	h2 {
		color: ${({ theme }) => theme.text};
	}
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 8px;
	gap: 14px;
	flex-wrap: wrap;
`;

const StyledHeading = styled.div`
	margin-bottom: 0.8rem;
`;

const Search = () => {
	const query = useLocation().search;

	/* eslint-disable max-len */
	const { data: videos, isLoading } = useQuery([QueryKeys.SEARCH, query], () => videoSearch(query));

	if (isLoading) <Loader />;

	return (
		<Container>
			{videos && videos.length ? (
				<>
					<StyledHeading>
						<h2>Search results for: &apos;{query.split('=')[1]}&apos;</h2>
					</StyledHeading>
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
