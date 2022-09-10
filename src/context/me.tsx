import { createContext, ReactNode, useContext } from 'react';
import { RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query';
import { getMe } from '../lib/api';
import { FC } from '../main';
import { QueryKeys, User } from '../types';

const MeContext = createContext<{
	user: User | undefined;
	refetch?: <TPageData>(
		/* eslint-disable-next-line no-unused-vars */
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
		/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	) => any;
}>({ user: undefined });

const MeContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const { data, refetch, isLoading } = useQuery([QueryKeys.ME], getMe);

	return (
		<MeContext.Provider value={{ user: data as User, refetch }}>
			{isLoading ? <p>Loading...</p> : children}
		</MeContext.Provider>
	);
};

const useMe = () => useContext(MeContext);

export { MeContextProvider, useMe };
