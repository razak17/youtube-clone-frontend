import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/* eslint-disable-next-line no-unused-vars */
export type FC<T> = (val: T) => JSX.Element;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
