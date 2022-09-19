import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import MovieIcon from '@mui/icons-material/Movie';
import ArticleIcon from '@mui/icons-material/Article';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import FlagIcon from '@mui/icons-material/Flag';
import HelpIcon from '@mui/icons-material/Help';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

import logo from '../assets/logo.png';
import { FC } from '../main';
import { useMe } from '../context/me';
import { useMainContext } from '../context';
import { logout } from '../lib/api';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { QueryKeys } from '../types';

export interface SidebarProps {
	sidebarOpen: boolean;
}

const StyledContainer = styled.nav<SidebarProps>`
	display: ${(props) => (props.sidebarOpen ? 'none' : 'block')};
	width: 240px;
	color: ${({ theme }) => theme.text};
`;

const StyledWrapper = styled.div`
	background-color: ${({ theme }) => theme.bgLighter};
	width: 240px;
	height: 100%;
	overflow-y: auto;
	display: flex;
	position: fixed;
	flex-direction: column;
	z-index: 1200;
	top: 0px;
	left: 0px;
	border-right: 1px solid ${({ theme }) => theme.soft};
`;

const StyledLogoWrapper = styled.div`
	background-color: ${({ theme }) => theme.bgLighter};
	position: sticky;
	top: 0;
	padding: 13px 28px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	// border-bottom: 1px solid ${({ theme }) => theme.soft};
	span {
		font-weight: bold;
		font-size: 18px;
		padding-top: 6px;
	}
`;

const Logo = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	span {
		font-weight: bold;
		font-size: 18px;
		padding-top: 0px;
	}
	img {
		height: 22px;
	}
`;

const StyledGuideSection = styled.div`
	padding: 12px 0;
	border-bottom: 1px solid ${({ theme }) => theme.soft};
`;

const StyledItem = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	cursor: pointer;
	padding: 8px 28px;
`;

const StyledLogin = styled.div`
	padding: 8px 28px;
`;

const StyledBtn = styled.button`
	padding: 6px 12px;
	background-color: transparent;
	border: 1px solid ${({ theme }) => theme.blue};
	color: ${({ theme }) => theme.blue};
	border-radius: 3px;
	font-size: 14px;
	font-weight: 500;
	text-transform: uppercase;
	margin-top: 10px;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const StyledTitle = styled.h2`
	padding: 8px 28px 0px 28px;
	margin: 0;
	font-size: 14px;
	text-transform: uppercase;
	font-weight: 500;
	color: ${({ theme }) => theme.textSoft};
`;

const Sidebar: FC<{
	darkMode?: boolean;
	setDarkMode: Dispatch<SetStateAction<boolean>>;
}> = ({ darkMode, setDarkMode }) => {
	const { user } = useMe();
	const queryClient = useQueryClient();
	const { sidebarOpen } = useMainContext();

	const mutation = useMutation<string, AxiosError, Parameters<typeof logout>>(logout, {
		onSuccess: () => {
			queryClient.invalidateQueries([QueryKeys.ME]);
		}
	});

	const handleLogout = () => {
		mutation.mutate([]);
	};

	return (
		<StyledContainer sidebarOpen={sidebarOpen}>
			<StyledWrapper>
				<StyledLogoWrapper>
					<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
						<Logo>
							<img src={logo} />
							<span>DevTube</span>
						</Logo>
					</Link>
				</StyledLogoWrapper>
				<StyledGuideSection>
					<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
						<StyledItem>
							<HomeIcon />
							Home
						</StyledItem>
					</Link>
					<Link to='/explore' style={{ textDecoration: 'none', color: 'inherit' }}>
						<StyledItem>
							<ExploreIcon />
							Explore
						</StyledItem>
					</Link>
					<Link to='/subscriptions' style={{ textDecoration: 'none', color: 'inherit' }}>
						<StyledItem>
							<SubscriptionsIcon />
							Subscriptions
						</StyledItem>
					</Link>
				</StyledGuideSection>
				<StyledGuideSection>
					<StyledItem>
						<VideoLibraryIcon />
						Library
					</StyledItem>
					<StyledItem>
						<HistoryIcon />
						History
					</StyledItem>
					{!user && (
						<StyledLogin>
							log in to like videos, comment, and subscribe.
							<Link to='login' style={{ textDecoration: 'none' }}>
								<StyledBtn>
									<AccountCircleIcon />
									LOG IN
								</StyledBtn>
							</Link>
						</StyledLogin>
					)}
				</StyledGuideSection>
				<StyledTitle>More from DevTube</StyledTitle>
				<StyledGuideSection>
					<StyledItem>
						<LibraryMusicIcon />
						Music
					</StyledItem>
					<StyledItem>
						<SportsBasketballIcon />
						Sports
					</StyledItem>
					<StyledItem>
						<SportsEsportsIcon />
						Gaming
					</StyledItem>
					<StyledItem>
						<MovieIcon />
						Movies
					</StyledItem>
					<StyledItem>
						<ArticleIcon />
						News
					</StyledItem>
					<StyledItem>
						<LiveTvIcon />
						Live
					</StyledItem>
				</StyledGuideSection>
				<StyledGuideSection>
					<StyledItem>
						<SettingsIcon />
						Settings
					</StyledItem>
					<StyledItem>
						<FlagIcon />
						Report
					</StyledItem>
					<StyledItem>
						<HelpIcon />
						Help
					</StyledItem>
					{/* <StyledItem onClick={() => setDarkMode(!darkMode)}> */}
					{/* 	<SettingsBrightnessIcon /> */}
					{/* 	{darkMode ? 'Light' : 'Dark'} Mode */}
					{/* </StyledItem> */}
				</StyledGuideSection>
				{user && (
					<StyledLogin onClick={handleLogout}>
						<Link to='login' style={{ textDecoration: 'none' }}>
							<StyledBtn>
								<AccountCircleIcon />
								Logout
							</StyledBtn>
						</Link>
					</StyledLogin>
				)}
			</StyledWrapper>
		</StyledContainer>
	);
};

export default Sidebar;
