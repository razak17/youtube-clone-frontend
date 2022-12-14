import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import { MainContextProvider } from './context';

/* eslint-disable-next-line no-unused-vars */
export type FC<T> = (val: T) => JSX.Element;

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<MainContextProvider>
			<QueryClientProvider client={queryClient}>
				<App />
				<ReactQueryDevtools initialIsOpen />
			</QueryClientProvider>
		</MainContextProvider>
	</React.StrictMode>
);
