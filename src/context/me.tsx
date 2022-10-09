import { createContext, ReactNode, useContext } from 'react';
import { RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query';
import { getMe } from '../lib/api';
import { FC } from '../main';
import { QueryKeys, User } from '../types';
import CircularProgress from '@mui/material/CircularProgress';
import Loader from '../components/Loader';

const MeContext = createContext<{
	user: User | undefined;
	refetch?: <TPageData>(
		/* eslint-disable-next-line no-unused-vars */
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
		/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	) => any;
	remove?: () => void;
}>({ user: undefined });

const MeContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const { data, refetch, remove, isLoading } = useQuery([QueryKeys.ME], getMe);

	return (
		<MeContext.Provider value={{ user: data as User, refetch, remove }}>
			{isLoading ? (
      <Loader />
			) : (
				children
			)}
		</MeContext.Provider>
	);
};

const useMe = () => useContext(MeContext);

export { MeContextProvider, useMe };
