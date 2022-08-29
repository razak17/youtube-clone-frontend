import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';

const Container = styled.div`
	display: flex;
`;

const Main = styled.div`
	flex: 7;
`;
const Wrapper = styled.div`
	padding: 22px 96px;
`;

function App() {
	return (
		<Container>
			<BrowserRouter>
				<Sidebar />
				<Main>
					<Navbar />
					<Wrapper>Video Cards</Wrapper>
				</Main>
			</BrowserRouter>
		</Container>
	);
}

export default App;
