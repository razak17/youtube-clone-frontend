import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { useMe } from '../context/me';

const Container = styled.div`
	position: sticky;
	top: 0;
	background-color: ${({ theme }) => theme.bgLighter};
	height: 56px;
	border-bottom: 1px solid ${({ theme }) => theme.softer};
`;

const StyledWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 100%;
	padding: 0px 20px;
	position: relative;
`;

const StyeldSearch = styled.div`
	width: 40%;
	position: absolute;
	left: 0px;
	right: 0px;
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
	border: 1px solid #065fd4;
	color: #065fd4;
	border-radius: 3px;
	text-transform: uppercase;
	font-weight: 500;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const Navbar = () => {
	const { user } = useMe();

	return (
		<Container>
			<StyledWrapper>
				<StyeldSearch>
					<StyledInput placeholder='Search' />
					<SearchOutlinedIcon style={{ color: '#606060' }} />
				</StyeldSearch>
				{!user && (
					<Link to='register' style={{ textDecoration: 'none' }}>
						<StyledButton>
							<AccountCircleOutlinedIcon />
							sign up
						</StyledButton>
					</Link>
				)}
			</StyledWrapper>
		</Container>
	);
};

export default Navbar;
