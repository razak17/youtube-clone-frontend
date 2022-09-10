import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools} from 'react-query/devtools';
import App from './App';

/* eslint-disable-next-line no-unused-vars */
export type FC<T> = (val: T) => JSX.Element;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
      <ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	</React.StrictMode>
);
