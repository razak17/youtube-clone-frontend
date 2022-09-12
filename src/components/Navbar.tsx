import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { Link } from 'react-router-dom';
import { useMe } from '../context/me';
import { useState } from 'react';
import Upload from './Upload';

const Container = styled.header`
	display: flex;
	flex-direction: column;
	position: fixed;
	z-index: 1100;
	width: calc(100% - 270px);
	top: 0;
	left: auto;
	right: 0;
	background-color: ${({ theme }) => theme.bgLighter};
	border-bottom: 1px solid ${({ theme }) => theme.softer};
	padding: 8px 16px;
`;

const StyledWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 100%;
	position: relative;
`;

const StyeldSearch = styled.div`
	width: 40%;
	position: absolute;
	left: 0;
	right: 0;
	margin: auto;
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
	color: ${({ theme }) => theme.text};
	outline: none;
`;

const StyledButton = styled.button`
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

const StyledUser = styled.div`
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
	const [open, setOpen] = useState(false);
	const { user } = useMe();

	return (
		<>
			<Container>
				<StyledWrapper>
					<StyeldSearch>
						<StyledInput placeholder='Search' />
						<SearchOutlinedIcon style={{ color: '#606060' }} />
					</StyeldSearch>
					{user ? (
						<StyledUser>
							<VideoCallOutlinedIcon onClick={() => setOpen(true)} />
							<StyledAvatar src={user.profilePic} />
						</StyledUser>
					) : (
						<Link to='register' style={{ textDecoration: 'none' }}>
							<StyledButton>
								<AccountCircleOutlinedIcon />
								sign up
							</StyledButton>
						</Link>
					)}
				</StyledWrapper>
			</Container>
			{open && <Upload />}
		</>
	);
};

export default Navbar;
