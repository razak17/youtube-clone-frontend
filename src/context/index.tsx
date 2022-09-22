import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { FC } from '../main';

export type MainContextType = {
	sidebarOpen: boolean;
	setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const MainContext = createContext<MainContextType | undefined>(undefined);

const MainContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<MainContext.Provider value={{ sidebarOpen, setSidebarOpen }}> {children} </MainContext.Provider>
	);
};

const useMainContext = () => useContext(MainContext) as MainContextType;

export { MainContextProvider, useMainContext };
