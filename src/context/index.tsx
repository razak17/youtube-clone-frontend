import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { FC } from '../main';

const MainContext = createContext<{
  menuOpen: boolean,
  setMenuOpen: Dispatch<SetStateAction<boolean>>
} | null>(null);

const MainContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(true);

	return (
		<MainContext.Provider value={{ menuOpen, setMenuOpen }}>
			{children}
		</MainContext.Provider>
	);
};

const useMainContext = () => useContext(MainContext);

export { MainContextProvider, useMainContext };

