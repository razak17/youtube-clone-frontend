import axios from 'axios';
import { GoogleUser, User, Video, VideoType, Comment } from '../types';

const base = import.meta.env.VITE_PUBLIC_API_ENDPOINT;

const userBase = `${base}/users`;
const authBase = `${base}/auth`;
const videoBase = `${base}/videos`;
const commentsBase = `${base}/comments`;

const auth = axios.create({
	baseURL: base,
	withCredentials: true
});

export const getVideos = async (type: VideoType): Promise<Video[]> => {
	// Make sure parameters passed from React component are not undefined.
	if (!type) throw new Error('video type is not defined.');
	const res = await axios.get(`${videoBase}/${type}`, {
		withCredentials: type === 'subscriptions'
	});
	return res.data;
};

export const getUser = async (userId: string): Promise<User> => {
	if (!userId) throw new Error('userId is not defined.');
	const res = await axios.get(`${userBase}/find/${userId}`);
	return res.data;
};

export const register = async (payload: {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}) => {
	const res = await axios.post(`${userBase}/register`, payload);
	return res.data;
};

export const login = async (payload: { email: string; password: string }) => {
	const res = await auth.post(`${authBase}/login`, payload);
	return res.data;
};

export const logout = async () => {
	const res = await auth.post(`${authBase}/logout`);
	return res.data;
};

export const googleLogin = async (payload: GoogleUser) => {
	const res = await auth.post(`${authBase}/google`, payload);
	return res.data;
};

export const getMe = async (): Promise<User> => {
	const res = await auth.get(`${userBase}/me`);
	return res.data;
};

export const getVideo = async (videoId: string): Promise<Video> => {
	if (!videoId) throw new Error('videoId is not defined.');
	const res = await axios.get(`${videoBase}/find/${videoId}`);
	return res.data;
};

export const uploadVideo = async (
	payload: Omit<Video, '__v' | '_id' | 'owner' | 'createdAt' | 'updatedAt'>
): Promise<Video> => {
	const res = await auth.post(`${videoBase}`, payload);
	return res.data;
};

export const getVideoOwner = async (videoId: string): Promise<User> => {
	if (!videoId) throw new Error('videoId is not defined.');
	const video = await getVideo(videoId);
	const res = await axios.get(`${userBase}/find/${video.owner}`);
	return res.data;
};

export const getRecommendations = async (tags: string): Promise<Video[]> => {
	if (!tags) throw new Error('tags is not defined.');
	const res = await axios.get(`${videoBase}/tags?tags=${tags}`);
	return res.data;
};

export const videoSearch = async (query: string): Promise<Video[]> => {
	if (!query) throw new Error('query is not defined.');
	const res = await axios.get(`${videoBase}/search${query}`);
	return res.data;
};

export const likeVideo = async (videoId: string) => {
	if (!videoId) throw new Error('videoId is not defined.');
	const res = await auth.put(`${userBase}/like/${videoId}`);
	return res.data;
};

export const dislikeVideo = async (videoId: string) => {
	if (!videoId) throw new Error('videoId is not defined.');
	const res = await auth.put(`${userBase}/dislike/${videoId}`);
	return res.data;
};

export const subscribe = async (userId: string) => {
	if (!userId) throw new Error('userId is not defined.');
	const res = await auth.put(`${userBase}/sub/${userId}`);
	return res.data;
};

export const unsubscribe = async (userId: string) => {
	if (!userId) throw new Error('userId is not defined.');
	const res = await auth.put(`${userBase}/unsub/${userId}`);
	return res.data;
};

export const getComments = async (videoId: string): Promise<Comment[]> => {
	if (!videoId) throw new Error('videoId is not defined.');
	const res = await axios.get(`${commentsBase}/${videoId}`);
	return res.data;
};

export const addComment = async (payload: Pick<Comment, 'videoId' | 'description'>) => {
	const res = await auth.post(`${commentsBase}`, payload);
	return res.data;
};
