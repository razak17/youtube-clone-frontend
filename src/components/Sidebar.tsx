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
import { useMe } from '../context/me';

const StyledContainer = styled.div`
	position: sticky;
	overflow: scroll;
	width: 240px;
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

const Logo = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	span {
		font-weight: bold;
		font-size: 18px;
		padding-top: 6px;
	}
	img {
		height: 25px;
	}
`;

const StyledWrapper = styled.div`
	height: 100%;
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
	border: 1px solid #065fd4;
	color: #065fd4;
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
	color: #aaaaaa;
`;

const Sidebar: FC<{
	darkMode?: boolean;
	setDarkMode: Dispatch<SetStateAction<boolean>>;
}> = ({ darkMode, setDarkMode }) => {
	const { user } = useMe();

	const { user: u, refetch } = useMe();

	const handleLogout = () => {
		{
			/* mutation.mutate({user: undefined}); */
		}
	};

	return (
		<StyledContainer>
			<StyledLogoWrapper>
				<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
					<Logo>
						<img src={logo} />
						<span>DevTube</span>
					</Logo>
				</Link>
			</StyledLogoWrapper>
			<StyledWrapper>
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
					<StyledItem onClick={() => setDarkMode(!darkMode)}>
						{user && (
							<StyledLogin>
								<Link to='/' style={{ textDecoration: 'none' }}>
									<StyledBtn onClick={handleLogout}>
										<AccountCircleOutlinedIcon />
										sign out
									</StyledBtn>
								</Link>
							</StyledLogin>
						)}
					</StyledItem>
				</StyledGuideSection>
			</StyledWrapper>
		</StyledContainer>
	);
};

export default Sidebar;
