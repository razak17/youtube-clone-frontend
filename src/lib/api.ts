import axios from 'axios';
import { User, Video } from '../types';

const base = import.meta.env.VITE_PUBLIC_API_ENDPOINT;

const userBase = `${base}/users`;
const authBase = `${base}/auth`;
const videoBase = `${base}/videos`;
// const commentsBase = `${base}/comments`;

export const getVideos = async (type: string): Promise<Video[]> => {
	const res = await axios.get(`${videoBase}/${type}`);
	return res.data;
};

export const getUsers = async (userId: string): Promise<User> => {
	const res = await axios.get(`${userBase}/find/${userId}`);
	return res.data;
};
