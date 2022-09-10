import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { darkColors, lightColors } from './style/theme';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Video from './pages/Video';
import Register from './pages/Register';
import { MeContextProvider, useMe } from './context/me';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';
import { User } from './types';

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
	const user = useMe();

	return (
		<ThemeProvider theme={darkMode ? darkColors : lightColors}>
			<StyledCOntainer>
				<BrowserRouter>
					<Sidebar
						user={user?.user as User}
						darkMode={darkMode}
						setDarkMode={setDarkMode}
					/>
					<StyledMain>
						<Navbar user={user?.user as User} />
						<StyledWrapper>
							<Routes>
								<Route index element={<Home type='random' />} />
								<Route path='explore' element={<Home type='trending' />} />
								<Route path='subscriptions' element={<Home type='subscriptions' />} />
								<Route
									path='login'
									element={
										<AuthRoute>
											<Login />
										</AuthRoute>
									}
								/>
								<Route
									path='register'
									element={
										<AuthRoute>
											<Register />
										</AuthRoute>
									}
								/>
								<Route path='video'>
									<Route path=':id' element={<Video />} />
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
			<MeContextProvider>
				<BaseApp />
				<ReactQueryDevtools initialIsOpen />
			</MeContextProvider>
		</QueryClientProvider>
	);
}

export default App;
