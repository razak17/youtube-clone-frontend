import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';

import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useMainContext } from '../context';

const StyledLogoWrapper = styled.div`
	background-color: ${({ theme }) => theme.bgLighter};
	padding: 13px 0;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	// border-bottom: 1px solid ${({ theme }) => theme.soft};
	span {
		font-weight: bold;
		font-size: 18px;
		padding-top: 6px;
	}
`;

const StyledLogo = styled.div`
	display: flex;
	align-items: center;
	margin-left: 1.5rem;
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
const Logo = () => {
	const { sidebarOpen, setSidebarOpen } = useMainContext();

	return (
		<StyledLogoWrapper>
			<MenuIcon
				onClick={() => setSidebarOpen(!sidebarOpen)}
				style={{ color: '#fff', borderRadius: '20px', fontSize: '28px', cursor: 'pointer' }}
			/>
			<Link to='/' style={{ textDecoration: 'none', color: '#fff' }}>
				<StyledLogo>
					<img src={logo} />
					<span>YouTube</span>
				</StyledLogo>
			</Link>
		</StyledLogoWrapper>
	);
};

export default Logo;
