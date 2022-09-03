import styled from 'styled-components';

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 56px);
	color: ${({ theme }) => theme.text};
	padding-top: 48px;
`;

const StyledSection = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 250px;
	border-radius: 3px;
	background-color: ${({ theme }) => theme.bgLighter};
	border: 1px solid ${({ theme }) => theme.soft};
	padding: 20px 50px;
	gap: 10px;
`;

const StyledTitle = styled.div`
	margin-bottom: 18px;
	h1 {
		font-size: 24px;
	}
`;

const StyledSubTitle = styled.div`
	padding: 32px 0;
	p {
		font-size: 14px;
		font-weight: 300;
	}
`;

const StyledInput = styled.input`
	border: 1px solid ${({ theme }) => theme.soft};
	border-radius: 3px;
	padding: 10px;
	background-color: transparent;
	width: 100%;
	outline: none;
	color: ${({ theme }) => theme.text};
`;

const StyledButton = styled.button`
	border-radius: 3px;
	border: none;
	padding: 10px 24px;
	font-weight: 500;
	font-size: 16px;
	cursor: pointer;
	background-color: ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.textSoft};
`;

const SignIn = () => {
	return (
		<StyledContainer>
			<StyledSection>
				<StyledTitle>
					<h1>Sign In</h1>
				</StyledTitle>
				<StyledInput placeholder='Username' />
				<StyledInput type='password' placeholder='Password' />
				<StyledButton>Sign In</StyledButton>
			</StyledSection>
			<StyledSubTitle>
				<p>New User?,</p>
			</StyledSubTitle>
			<StyledSection>
				<StyledTitle>
					<h1>Sign Up</h1>
				</StyledTitle>
				<StyledInput placeholder='Username' />
				<StyledInput placeholder='Email' />
				<StyledInput type='password' placeholder='Password' />
				<StyledButton>Sign Up</StyledButton>
			</StyledSection>
		</StyledContainer>
	);
};

export default SignIn;
