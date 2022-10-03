import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: calc(100vh - 56px);
	color: ${({ theme }) => theme.text};
	padding-top: 48px;
`;

export const StyledSection = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	border-radius: 3px;
	background-color: ${({ theme }) => theme.bgLighter};
	border: 1px solid ${({ theme }) => theme.soft};
	padding: 20px 50px;
	gap: 10px;
	h1 {
		font-size: 24px;
	}
`;

export const StyledWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export const StyledSpan = styled.div`
	padding-top: 12px;
	font-size: 14px;
	a {
		text-decoration: none;
		color: ${({ theme }) => theme.blue};
	}
`;

export const StyledSubTitle = styled.h2`
	font-size: 14px;
	font-weight: 300;
	margin-bottom: 12px;
`;

export const Form = ({ type, children }: { type: string; children: ReactNode }) => {
	return (
		<StyledContainer>
			<StyledSection>
				<h1>{type}</h1>
				<StyledSubTitle>
					{type === 'Register' ? 'sign up to get started' : 'login to continue'}
				</StyledSubTitle>
				{children}
				<StyledSpan>
					{type === 'Register' ? 'already registered?' : 'new user?'}
					<Link to={type === 'Register' ? '/login' : '/register'}>
						{type === 'Register' ? ' login' : ' register'}
					</Link>
				</StyledSpan>
			</StyledSection>
		</StyledContainer>
	);
};
