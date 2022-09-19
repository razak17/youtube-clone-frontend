import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

export const StyledInput = styled.input`
	border: 1px solid ${({ theme }) => theme.soft};
	border-radius: 3px;
	padding: 10px 0;
	margin: 8px 0;
	background-color: transparent;
	width: 100%;
	outline: none;
	color: ${({ theme }) => theme.text};
`;

interface InputProps {
	label?: string;
	placeholder: string;
	type: string;
	error?: FieldError;
}

const StyledSpan = styled.span`
	color: red;
	font-size: 12px;
`;
export const Error = ({ error }: { error?: string }) => {
	if (!error) return null;

	return <StyledSpan>{error as string}</StyledSpan>;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ type = 'text', error, ...props },
	ref
) {
	return (
		<>
			<StyledInput type={type} ref={ref} {...props} />
			<Error error={error?.message} />
		</>
	);
});
