import styled from 'styled-components';
import Card from '../components/Card';
import { useVideo } from '../context/videos';

const StyledContianer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const Home = () => {
	const { videos } = useVideo();
	console.log(videos);

	return (
		<StyledContianer>
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
		</StyledContianer>
	);
};

export default Home;
