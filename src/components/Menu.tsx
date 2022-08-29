import styled from 'styled-components';

const Container = styled.div`
	flex: 1;
	background-color: #030303;
	color: white;
	height: 100vh;
`;
const Wrapper = styled.div`
	padding: 18px 26px;
`;

const Menu = () => {
	return (
		<Container>
			<Wrapper>Menu</Wrapper>
		</Container>
	);
};

export default Menu;
