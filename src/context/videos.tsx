import { createContext, ReactNode, useContext } from 'react';
import { RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query';
import { getVideos } from '../lib/api';
import { FC } from '../main';
import { QueryKeys, Video } from '../types';

const VideoContext = createContext<{
	randomVideos?: Video[];
	refetch?: <TPageData>(
		/* eslint-disable-next-line no-unused-vars */
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
		/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	) => any;
}>({
	randomVideos: undefined
});

const VideosContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const { data: random, isLoading, refetch } = useQuery([QueryKeys.VIDEOS], () => getVideos('random'));

	return (
		<VideoContext.Provider value={{ randomVideos: random as Video[], refetch }}>
			{isLoading ? <p>Loading...</p> : children}
		</VideoContext.Provider>
	);
};

const useVideo = () => useContext(VideoContext);

export { VideosContextProvider, useVideo };
