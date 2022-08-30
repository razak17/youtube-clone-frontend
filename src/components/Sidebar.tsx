import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LamaTube from '../assets/logo.png';

const Container = styled.div`
	flex: 1;
	background-color: #030303;
	color: white;
	height: 100vh;
`;
const Wrapper = styled.div`
	padding: 18px 26px;
`;
const Logo = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	margin-bottom: 20px;

	span {
		font-weight: bold;
		font-size: 18px;
	}
`;

const Img = styled.img`
	height: 25px;
`;

const Sidebar = () => {
	return (
		<Container>
			<Wrapper>
				<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
					<Logo>
						<Img src={LamaTube} />
						<span>DevTube</span>
					</Logo>
				</Link>
			</Wrapper>
		</Container>
	);
};

export default Sidebar;
