import { createContext, ReactNode, useContext } from 'react';
import { RefetchOptions, RefetchQueryFilters, useQuery } from 'react-query';
import { getVideo } from '../lib/api';
import { FC } from '../main';
import { QueryKeys, Video } from '../types';

const CurrentVideoContext = createContext<{
	currentVideo?: Video;
	refetch?: <TPageData>(
		/* eslint-disable-next-line no-unused-vars */
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
		/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	) => any;
}>({
	currentVideo: undefined
});

const CurrentVideoContextProvider: FC<{ children: ReactNode; videoId: string }> = ({
	children,
	videoId
}) => {
	const {
		data: random,
		isLoading,
		refetch
	} = useQuery([QueryKeys.CURRENT_VIDEO], () => getVideo(videoId));

	return (
		<CurrentVideoContext.Provider value={{ currentVideo: random as Video, refetch }}>
			{isLoading ? <p>Loading...</p> : children}
		</CurrentVideoContext.Provider>
	);
};

const useCurrentVideo = () => useContext(CurrentVideoContext);

export { CurrentVideoContextProvider, useCurrentVideo };
