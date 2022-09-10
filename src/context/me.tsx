import { createContext, ReactNode, useContext } from 'react';
import { useQuery } from 'react-query';
import { getMe } from '../lib/api';
import { FC } from '../main';
import { QueryKeys, User } from '../types';

const MeContext = createContext<{ user: User } | undefined>(undefined);

const MeContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const { data, isLoading } = useQuery([QueryKeys.ME], getMe);

	return (
		<MeContext.Provider value={{ user: data as User }}>
			{isLoading ? <p>Loading...</p> : children}
		</MeContext.Provider>
	);
};

const useMe = () => useContext(MeContext);

export { MeContextProvider, useMe };
