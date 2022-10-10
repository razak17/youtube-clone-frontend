import { useState } from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { Link, useNavigate } from 'react-router-dom';

import { useMe } from '../context/me';
import Logo from './Logo';

const Container = styled.header`
	position: sticky;
	top: 0;
	overflow: hidden;
	z-index: 1100;
	background-color: ${({ theme }) => theme.bgLighter};
	border-bottom: 1px solid ${({ theme }) => theme.softer};
	padding: 8px 16px;
`;

const StyledWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
`;

const StyledSearch = styled.div`
	width: 40%;
	display: flex;
	align-items: center;
	padding: 6px;
	border: 1px solid ${({ theme }) => theme.softer};
	border-radius: 3px;
	background-color: ${({ theme }) => theme.bg};
	@media (max-width: 1080px) {
		width: 50%;
	}
`;

const StyledInput = styled.input`
	border: none;
	padding: 8px;
	background-color: ${({ theme }) => theme.bg};
	width: 100%;
	color: ${({ theme }) => theme.text};
	outline: none;
	font-size: 14px;
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

const StyledAuth = styled.div`
	@media (max-width: 1080px) {
		display: none;
	}
`;

const StyledUser = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	font-weight: 500;
	color: ${({ theme }) => theme.text};
	@media (max-width: 1080px) {
		display: none;
	}
`;

const StyledForm = styled.form`
	display: flex;
	justify-content: flex-end;
	width: 100%;
`;

const StyledSearchIcon = styled.div`
	display: flex;
	cursor: 'pointer';
	align-items: center;
	svg {
		color: #606060;
	}
`;

const Navbar = () => {
	const { user } = useMe();
	const navigate = useNavigate();

	const [query, setQuery] = useState('');

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (query.trim() !== '') navigate(`/search?q=${query}`);
	};

	/* eslint-disable max-len */
	return (
		<>
			<Container>
				<StyledWrapper>
					<Logo />
					<StyledSearch>
						<StyledForm onSubmit={handleSearch}>
							<StyledInput placeholder='Search' onChange={(e) => setQuery(e.target.value)} />
							<StyledSearchIcon>
								<SearchOutlinedIcon />
							</StyledSearchIcon>
						</StyledForm>
					</StyledSearch>
					{user ? (
						<StyledUser>
							<Link to='upload' style={{ textDecoration: 'none', color: 'inherit' }}>
								<VideoCallOutlinedIcon style={{ cursor: 'pointer' }} />
							</Link>
							<p>{user.username}</p>
						</StyledUser>
					) : (
						<StyledAuth>
							<Link to='login' style={{ textDecoration: 'none' }}>
								<StyledButton>
									<AccountCircleOutlinedIcon />
									sign in
								</StyledButton>
							</Link>
						</StyledAuth>
					)}
				</StyledWrapper>
			</Container>
		</>
	);
};

export default Navbar;
