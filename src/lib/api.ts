import axios from 'axios';
import { Video } from '../types';

const base = import.meta.env.VITE_PUBLIC_API_ENDPOINT;

const userBase = `${base}/users`;
const authBase = `${base}/auth`;
const videosBase = `${base}/videos`;
// const commentsBase = `${base}/comments`;

export const getVideos = async (): Promise<Video[]> => {
	const res = await axios.get(`${videosBase}/random`);
	return res.data;
};

