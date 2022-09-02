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

const StyledContainer = styled.div`
	flex: 1;
	height: 100%;
	background-color: #030303;
	color: white;
	font-size: 14px;
	position: sticky;
	top: 0;
`;

const StyledWrapper = styled.div`
	padding: 18px 26px;
`;

const Logo = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	margin-bottom: 20px;
	span {
		font-weight: bold;
		font-size: 18px;
		padding-top: 6px;
	}
`;

const StyledImg = styled.img`
	height: 25px;
`;

const StyledItem = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	cursor: pointer;
	padding: 7.5px 0px;
`;

const StyledHr = styled.hr`
	margin: 15px 0px;
`;

const StyledButton = styled.button`
	padding: 12px 45px;
	background-color: transparent;
	border: 1px solid #3ea6ff;
	color: #3ea6ff;
	border-radius: 5px;
	font-size: 16px;
	font-weight: 500;
	margin-top: 10px;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const StyledTitle = styled.h2`
	font-size: 14px;
	font-weight: 500;
	color: #aaaaaa;
	margin-bottom: 20px;
`;

const Sidebar = () => {
	return (
		<StyledContainer>
			<StyledWrapper>
				<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
					<Logo>
						<StyledImg src={logo} />
						<span>DevTube</span>
					</Logo>
				</Link>
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
				<StyledHr />
				<StyledItem>
					<VideoLibraryOutlinedIcon />
					Library
				</StyledItem>
				<StyledItem>
					<HistoryOutlinedIcon />
					History
				</StyledItem>
				<div>
					Sign in to like videos, comment, and subscribe.
					<Link to='signin' style={{ textDecoration: 'none' }}>
						<StyledButton>
							<AccountCircleOutlinedIcon />
							SIGN IN
						</StyledButton>
					</Link>
				</div>
				<StyledHr />
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
				<StyledHr />
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
				<StyledItem onClick={() => console.log('Hello')}>
					<SettingsBrightnessOutlinedIcon />
					Dark Mode
				</StyledItem>
			</StyledWrapper>
		</StyledContainer>
	);
};

export default Sidebar;
