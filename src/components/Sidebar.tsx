import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';

import logo from '../assets/logo.png';
import { FC } from '../main';

const StyledContainer = styled.div`
	width: 240px;
	height: 100%;
	background-color: ${({ theme }) => theme.bgLighter};
	color: ${({ theme }) => theme.text};
	font-size: 14px;
`;

const StyledLogoWrapper = styled.div`
	background-color: ${({ theme }) => theme.bgLighter};
	position: sticky;
	top: 0;
	height: 62px;
	padding: 0px 28px;
	display: flex;
	align-items: center;
	gap: 5px;
	span {
		font-weight: bold;
		font-size: 18px;
		padding-top: 6px;
	}
`;

const StyledWrapper = styled.div`
	height: 100%;
`;

const Logo = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	span {
		font-weight: bold;
		font-size: 18px;
		padding-top: 6px;
	}
`;

const StyledGuideSection = styled.div`
	padding: 12px 0;
	border-bottom: ${({ theme }) => theme.sidebarBorder};
`;

const StyledImg = styled.img`
	height: 25px;
`;

const StyledItem = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	cursor: pointer;
	padding: 8px 28px;
`;

const StyledSignIn = styled.div`
	padding: 8px 28px;
`;

const StyledButton = styled.button`
	padding: 6px 12px;
	background-color: transparent;
	border: 1px solid #065fd4;
	color: #065fd4;
	border-radius: 3px;
	font-size: 14px;
	font-weight: 500;
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
	color: #aaaaaa;
`;

const Sidebar: FC<{
	darkMode?: boolean;
	setDarkMode: Dispatch<SetStateAction<boolean>>;
}> = ({ darkMode, setDarkMode }) => {
	return (
		<StyledContainer>
			<StyledLogoWrapper>
				<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
					<Logo>
						<StyledImg src={logo} />
						<span>DevTube</span>
					</Logo>
				</Link>
			</StyledLogoWrapper>
			<StyledWrapper>
				<StyledGuideSection>
					<StyledItem>
						<HomeIcon />
						Home
					</StyledItem>
					<StyledItem>
						<ExploreOutlinedIcon />
						Explore
					</StyledItem>
					<StyledItem>
						<SubscriptionsOutlinedIcon />
						Subscriptions
					</StyledItem>
				</StyledGuideSection>
				<StyledGuideSection>
					<StyledItem>
						<VideoLibraryOutlinedIcon />
						Library
					</StyledItem>
					<StyledItem>
						<HistoryOutlinedIcon />
						History
					</StyledItem>
					<StyledSignIn>
						Sign in to like videos, comment, and subscribe.
						<Link to='signin' style={{ textDecoration: 'none' }}>
							<StyledButton>
								<AccountCircleOutlinedIcon />
								SIGN IN
							</StyledButton>
						</Link>
					</StyledSignIn>
				</StyledGuideSection>
				<StyledTitle>More from DevTube</StyledTitle>
				<StyledGuideSection>
					<StyledItem>
						<LibraryMusicOutlinedIcon />
						Music
					</StyledItem>
					<StyledItem>
						<SportsBasketballOutlinedIcon />
						Sports
					</StyledItem>
					<StyledItem>
						<SportsEsportsOutlinedIcon />
						Gaming
					</StyledItem>
					<StyledItem>
						<MovieOutlinedIcon />
						Movies
					</StyledItem>
					<StyledItem>
						<ArticleOutlinedIcon />
						News
					</StyledItem>
					<StyledItem>
						<LiveTvOutlinedIcon />
						Live
					</StyledItem>
				</StyledGuideSection>
				<StyledGuideSection>
					<StyledItem>
						<SettingsOutlinedIcon />
						Settings
					</StyledItem>
					<StyledItem>
						<FlagOutlinedIcon />
						Report
					</StyledItem>
					<StyledItem>
						<HelpOutlineOutlinedIcon />
						Help
					</StyledItem>
					<StyledItem onClick={() => setDarkMode(!darkMode)}>
						<SettingsBrightnessOutlinedIcon />
						{darkMode ? 'Light' : 'Dark'} Mode
					</StyledItem>
				</StyledGuideSection>
			</StyledWrapper>
		</StyledContainer>
	);
};

export default Sidebar;
