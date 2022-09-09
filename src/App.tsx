import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { darkColors, lightColors } from './style/theme';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Video from './pages/Video';

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

const queryClient = new QueryClient();

function BaseApp() {
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
									<Route index element={<Home type='random' />} />
									<Route path='explore' element={<Home type='trending' />} />
									<Route path='subscriptions' element={<Home type='subscriptions' />} />
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

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BaseApp />
			<ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	);
}

export default App;
