import axios from 'axios';
import { GoogleUser, User, Video, VideoType } from '../types';

const base = import.meta.env.VITE_PUBLIC_API_ENDPOINT;

const userBase = `${base}/users`;
const authBase = `${base}/auth`;
const videoBase = `${base}/videos`;
// const commentsBase = `${base}/comments`;

const auth = axios.create({
	baseURL: base,
	withCredentials: true
});

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
	const res = await auth.post(`${authBase}/login`, payload);
	return res.data;
}

export async function googleLogin(payload: GoogleUser) {
	const res = await auth.post(`${authBase}/google`, payload);
	return res.data;
}

export async function getMe(): Promise<User> {
	const res = await auth.get(`${userBase}/me`);
	return res.data;
}

export async function getVideo(videoId: string): Promise<Video> {
	const res = await axios.get(`${videoBase}/find/${videoId}`);
	return res.data;
}

export async function likeVideo(videoId: string) {
	const res = await auth.put(`${userBase}/like/${videoId}`);
	return res.data;
}

export async function dislikeVideo(videoId: string) {
	const res = await auth.put(`${userBase}/dislike/${videoId}`);
	return res.data;
}

export async function subscribe(userId: string) {
	const res = await auth.put(`${userBase}/sub/${userId}`);
	return res.data;
}

export async function unsubscribe(userId: string) {
	const res = await auth.put(`${userBase}/unsub/${userId}`);
	return res.data;
}
