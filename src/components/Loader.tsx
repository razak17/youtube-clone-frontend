import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '2rem',
				marginTop: '3rem'
			}}
		>
			<CircularProgress size='1rem' />
		</div>
	);
};

export default Loader;
