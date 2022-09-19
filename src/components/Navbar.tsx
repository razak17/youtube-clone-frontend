import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useMe } from '../context/me';
import { useMainContext } from '../context';
import MenuIcon from '@mui/icons-material/Menu';
import { SidebarProps } from './Sidebar';
import { useState } from 'react';

const Container = styled.header<SidebarProps>`
	display: flex;
	flex-direction: column;
	position: fixed;
	z-index: 1100;
	width: ${(props) => (props.sidebarOpen ? '100%' : 'calc(100% - 270px)')};
	top: 0;
	left: ${(props) => (props.sidebarOpen ? '' : 'auto')};
	right: ${(props) => (props.sidebarOpen ? '' : '0')};
	background-color: ${({ theme }) => theme.bgLighter};
	border-bottom: 1px solid ${({ theme }) => theme.softer};
	padding: 8px 16px;
`;

const StyledWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	position: relative;
`;

const StyeldSearch = styled.div`
	width: 40%;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 6px;
	border: 1px solid ${({ theme }) => theme.softer};
	border-radius: 3px;
	background-color: ${({ theme }) => theme.bg};
`;

const StyledInput = styled.input`
	border: none;
	background-color: ${({ theme }) => theme.bg};
	width: 100%;
	color: ${({ theme }) => theme.text};
	outline: none;
`;

const StyledButton = styled.button<SidebarProps>`
	margin-right: ${(props) => (props.sidebarOpen ? '32px' : '0px')};
	padding: 6px 12px;
	background-color: transparent;
	border: 1px solid ${({ theme }) => theme.blue};
	color: ${({ theme }) => theme.blue};
	border-radius: 3px;
	text-transform: uppercase;
	font-weight: 500;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const StyledUser = styled.div<SidebarProps>`
	margin-right: ${(props) => (props.sidebarOpen ? '32px' : '0px')};
	display: flex;
	align-items: center;
	gap: 10px;
	font-weight: 500;
	color: ${({ theme }) => theme.text};
`;

const StyledAvatar = styled.img`
	width: 32px;
	height: 32px;
	margin-left: 12px;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.textSoft};
`;

const Navbar = () => {
	const { user } = useMe();
	const navigate = useNavigate();

	const { sidebarOpen, setSidebarOpen } = useMainContext();
	const [query, setQuery] = useState('');

	const handleSearch = () => {
		if (query.trim() !== '') navigate(`/search?q=${query}`);
	};

	return (
		<>
			<Container sidebarOpen={sidebarOpen}>
				<StyledWrapper>
					<MenuIcon
						onClick={() => setSidebarOpen(!sidebarOpen)}
						style={{ color: '#fff', borderRadius: '20px', fontSize: '28px', cursor: 'pointer' }}
					/>
					<StyeldSearch>
						<StyledInput placeholder='Search' onChange={(e) => setQuery(e.target.value)} />
						<SearchOutlinedIcon style={{ color: '#606060', cursor: 'pointer' }} onClick={handleSearch} />
					</StyeldSearch>
					{user ? (
						<StyledUser sidebarOpen={sidebarOpen}>
							<Link to='upload' style={{ textDecoration: 'none', color: 'inherit' }}>
								<VideoCallOutlinedIcon style={{ cursor: 'pointer' }} />
							</Link>
							{/* <StyledAvatar style={{ cursor: 'pointer' }} src={user.profilePic} /> */}
							<p>{user.username}</p>
						</StyledUser>
					) : (
						<Link to='register' style={{ textDecoration: 'none' }}>
							<StyledButton sidebarOpen={sidebarOpen}>
								<AccountCircleOutlinedIcon />
								register
							</StyledButton>
						</Link>
					)}
				</StyledWrapper>
			</Container>
		</>
	);
};

export default Navbar;
