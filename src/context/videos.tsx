import { createContext, ReactNode, useContext } from 'react';
import { useQuery } from 'react-query';
import { getVideos } from '../lib/api';
import { QueryKeys, Video } from '../types';

const VideoContext = createContext<{ videos: Video[] } | undefined>(undefined);

function VideosContextProvider({ children }: { children: ReactNode }) {
	const { data, isLoading } = useQuery(QueryKeys.VIDEOS, () =>
		getVideos('random')
	);

	return (
		<VideoContext.Provider
			value={{
				videos: data as Video[]
			}}
		>
			{isLoading ? <p>Loading...</p> : children}
		</VideoContext.Provider>
	);
}

const useVideo = () => useContext(VideoContext);

export { VideosContextProvider, useVideo };
