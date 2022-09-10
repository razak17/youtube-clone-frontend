import axios from 'axios';
import { User, Video, VideoType } from '../types';

const base = import.meta.env.VITE_PUBLIC_API_ENDPOINT;

const userBase = `${base}/users`;
const authBase = `${base}/auth`;
const videoBase = `${base}/videos`;
// const commentsBase = `${base}/comments`;

export const getVideos = async (type: VideoType): Promise<Video[]> => {
	const res = await axios.get(`${videoBase}/${type}`, {
		withCredentials: type === 'subscriptions'
	});
	return res.data;
};

export const getUser = async (userId: string): Promise<User> => {
	const res = await axios.get(`${userBase}/find/${userId}`);
	return res.data;
};

export async function register(payload: {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}) {
	const res = await axios.post(`${userBase}/register`, payload);
	return res.data;
}

export async function login(payload: { email: string; password: string }) {
	const res = await axios.post(`${authBase}/login`, payload, {
		withCredentials: true
	});
	return res.data;
}

export async function getMe(): Promise<User> {
	const res = await axios.get(`${userBase}/me`, {
		withCredentials: true
	});
	return res.data;
}
