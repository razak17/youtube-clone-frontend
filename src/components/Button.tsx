import styled from 'styled-components';

export const StyledButton = styled.button`
	border-radius: 3px;
	border: none;
	width: 100%;
	padding: 10px 24px;
	margin-top: 12px;
	font-weight: 500;
	font-size: 14px;
	cursor: pointer;
	background-color: ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.textSoft};
`;

const Button = ({ text, disabled }: { text: string; disabled: boolean }) => {
	return <StyledButton disabled={disabled}>{text}</StyledButton>;
};

export default Button;
