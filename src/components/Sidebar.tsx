import { Dispatch, SetStateAction, useState } from 'react';
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
import { useMe } from '../context/me';
import { useMainContext } from '../context';

const StyledContainer = styled.nav`
display: ${(props) => props.contextMenu ? "none" : "block"};
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
  const {menuOpen} = useMainContext();

  const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
		<StyledContainer contextMenu={menuOpen ? 'open' : undefined}>
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
						<ExploreOutlinedIcon />
						Explore
					</StyledItem>
				</Link>
				<Link to='/subscriptions' style={{ textDecoration: 'none', color: 'inherit' }}>
					<StyledItem>
						<SubscriptionsOutlinedIcon />
						Subscriptions
					</StyledItem>
				</Link>
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
				{!user && (
					<StyledLogin>
						Sign in to like videos, comment, and subscribe.
						<Link to='login' style={{ textDecoration: 'none' }}>
							<StyledBtn>
								<AccountCircleOutlinedIcon />
								SIGN IN
							</StyledBtn>
						</Link>
					</StyledLogin>
				)}
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
