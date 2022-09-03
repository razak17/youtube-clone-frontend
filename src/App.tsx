import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Video from './pages/Video';

const StyledCOntainer = styled.div`
	display: flex;
`;

const StyledMain = styled.div`
	flex: 5;
`;
const StyledWrapper = styled.div`
	padding: 22px 42px;
`;

function App() {
	return (
		<StyledCOntainer>
			<BrowserRouter>
				<Sidebar />
				<StyledMain>
					<Navbar />
					<StyledWrapper>
						<Routes>
							<Route path='/'>
								<Route index element={<Home />} />
								<Route path='signin' element={<SignIn />} />
								<Route path='video'>
									<Route path=':id' element={<Video />} />
								</Route>
							</Route>
						</Routes>
					</StyledWrapper>
				</StyledMain>
			</BrowserRouter>
		</StyledCOntainer>
	);
}

export default App;
