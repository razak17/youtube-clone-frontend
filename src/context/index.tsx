import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { FC } from '../main';

const MainContext = createContext<{ sidebarOpen: boolean; setSidebarOpen: Dispatch<SetStateAction<boolean>> } | null>(
	null
);

const MainContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return <MainContext.Provider value={{ sidebarOpen, setSidebarOpen }}>{children}</MainContext.Provider>;
};

const useMainContext = () => useContext(MainContext);

export { MainContextProvider, useMainContext };
