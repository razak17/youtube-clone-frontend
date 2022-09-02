import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { videoURLs } from '../data';
import { FC } from '../main';

const StyledContainer = styled.div`
	width: ${(props) => props.itemType !== 'sm' && '360px'};
	margin-bottom: ${(props) => (props.itemType === 'sm' ? '10px' : '45px')};
	cursor: pointer;
	display: ${(props) => props.itemType === 'sm' && 'flex'};
	gap: 10px;
`;

const StyledImage = styled.img`
	width: 100%;
	height: ${(props) => (props.itemType === 'sm' ? '120px' : '202px')};
	background-color: #999;
	flex: 1;
`;

const StyledDetails = styled.div`
	display: flex;
	margin-top: ${(props) => props.itemType !== 'sm' && '16px'};
	gap: 12px;
	flex: 1;
`;

const StyledChannelImage = styled.img`
	width: 36px;
	height: 36px;
	border-radius: 50%;
	background-color: #999;
	display: ${(props) => props.itemType === 'sm' && 'none'};
`;

const StyledTexts = styled.div``;

const StyledTitle = styled.h1`
	font-size: 16px;
	font-weight: 500;
	color: ${({ theme }) => theme.text};
`;

const StyledChannelName = styled.h2`
	font-size: 14px;
	color: ${({ theme }) => theme.textSoft};
	margin: 9px 0px;
`;

const StyledInfo = styled.div`
	font-size: 14px;
	color: ${({ theme }) => theme.textSoft};
`;

const Card: FC<{type?: string}> = ({ type }) => {
	return (
		<Link to='/video/test' style={{ textDecoration: 'none' }}>
			<StyledContainer itemType={type}>
				<StyledImage
					itemType={type}
					src={videoURLs[1]}
				/>
				<StyledDetails itemType={type}>
					<StyledChannelImage
						itemType={type}
						src={videoURLs[2]}
					/>
					<StyledTexts>
						<StyledTitle>Test Video</StyledTitle>
						<StyledChannelName>Lama Dev</StyledChannelName>
						<StyledInfo>660,908 views • 1 day ago</StyledInfo>
					</StyledTexts>
				</StyledDetails>
			</StyledContainer>
		</Link>
	);
};

export default Card;
