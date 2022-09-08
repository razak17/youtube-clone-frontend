import axios from 'axios';
import { Video } from './types';

const base = import.meta.env.VITE_PUBLIC_API_ENDPOINT;

const userBase = `${base}/users`;
const authBase = `${base}/auth`;
const videosBase = `${base}/videos`;
// const commentsBase = `${base}/comments`;


export async function registerUser(payload: {
	username: string;
	password: string;
	email: string;
	confirmPassword: string;
}) {
	const res = await axios.post(userBase, payload);
	return res.data;
}

export async function login(payload: { email: string; password: string }) {
	const res = await axios.post(authBase, payload, {
		withCredentials: true
	});
	return res.data;
}

export async function getMe() {
	try {
		const res = await axios.get(userBase, {
			withCredentials: true
		});
		return res.data;
	} catch {
		return null;
	}
}

export async function uploadVideo({
	formData,
	config
}: {
	formData: FormData;
	config: { onUploadProgress: (_: string) => void };
}) {
	return axios
		.post(videosBase, formData, {
			withCredentials: true,
			...config,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		.then((res) => res.data);
}

export function updateVideo({
	videoId,
	...payload
}: {
	videoId: string;
	title: string;
	description: string;
}) {
	return axios.patch<Video>(`${videosBase}/${videoId}`, payload, {
		withCredentials: true
	});
}

export async function getVideos() {
	return axios.get(videosBase).then((res) => res.data);
}
