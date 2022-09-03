import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Video from './pages/Video';
import { darkColors, lightColors } from './style/theme';

const StyledCOntainer = styled.div`
	display: flex;
`;

const StyledMain = styled.div`
	flex: 4;
	background-color: ${({ theme }) => theme.bg};
`;
const StyledWrapper = styled.div`
	padding: 22px 20px;
`;

function App() {
	const [darkMode, setDarkMode] = useState(true);

	return (
		<ThemeProvider theme={darkMode ? darkColors : lightColors}>
			<StyledCOntainer>
				<BrowserRouter>
					<Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
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
		</ThemeProvider>
	);
}

export default App;
