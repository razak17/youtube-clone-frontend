import styled from 'styled-components';
import Card from '../components/Card';

const StyledContianer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const Home = () => {
	return (
		<StyledContianer>
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
