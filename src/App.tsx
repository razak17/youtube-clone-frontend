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
import Upload from './pages/Upload';
import Search from './pages/Search';

const StyledCOntainer = styled.div`
	background-color: ${({ theme }) => theme.bg};
`;

const StyledWrapper = styled.div`
`;

const StyledMain = styled.main<SidebarProps>`
	display: flex;
	width: ${(props) => (props.sidebarOpen ? '100%' : 'calc(100% - 250px)')};
	margin-left: auto;
	padding: 32px 0;
  @media (max-width: 1080px) {
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`;

const App = () => {
	const [darkMode, setDarkMode] = useState(true);
	const { sidebarOpen } = useMainContext();

	return (
		<MeContextProvider>
			<ThemeProvider theme={darkMode ? darkColors : lightColors}>
				<BrowserRouter>
					<StyledCOntainer>
						<StyledWrapper>
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
										<Route path='search' element={<Search />} />
										<Route
											path='upload'
											element={
												<PrivateRoute>
													<Upload sidebarOpen={sidebarOpen} />
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
						</StyledWrapper>
					</StyledCOntainer>
				</BrowserRouter>
			</ThemeProvider>
		</MeContextProvider>
	);
};

export default App;
