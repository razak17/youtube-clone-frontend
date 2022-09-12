import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { darkColors, lightColors } from './style/theme';
import Sidebar, { SidebarProps } from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Video from './pages/Video';
import Register from './pages/Register';
import { MeContextProvider } from './context/me';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';
import { useMainContext } from './context';

const StyledCOntainer = styled.div`
	background-color: ${({ theme }) => theme.bg};
	display: flex;
	height: 100vh;
	overflow-x: scroll;
`;

const StyledInner = styled.div`
	display: flex;
`;

const StyledMain = styled.main<SidebarProps>`
	display: flex;
	width: ${(props) => (props.sidebarOpen ? '100%' : 'calc(100% - 270px)')};
	padding: 72px 16px;
`;

function App() {
	const [darkMode, setDarkMode] = useState(true);
	const { sidebarOpen } = useMainContext();

	return (
		<MeContextProvider>
			<ThemeProvider theme={darkMode ? darkColors : lightColors}>
				<BrowserRouter>
					<StyledCOntainer>
						<StyledInner>
							<Navbar />
							<Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
              <StyledMain sidebarOpen={sidebarOpen}>
								<Routes>
									<Route path='/'>
										<Route index element={<Home type='random' />} />
										<Route path='explore' element={<Home type='trending' />} />
										<Route
											path='subscriptions'
											element={
												<PrivateRoute>
													<Home type='subscriptions' />
												</PrivateRoute>
											}
										/>
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
										<Route path='watch'>
											<Route path=':id' element={<Video />} />
										</Route>
									</Route>
								</Routes>
							</StyledMain>
						</StyledInner>
					</StyledCOntainer>
				</BrowserRouter>
			</ThemeProvider>
		</MeContextProvider>
	);
}

export default App;
