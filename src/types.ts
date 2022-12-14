/* eslint-disable no-unused-vars */
export interface Video {
	_id: string;
	owner: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	videoUrl: string;
	views?: number;
	tags?: string[];
	likes?: string[];
	dislikes?: string[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export type VideoType = 'random' | 'trending' | 'subscriptions';

export interface User {
	_id: string;
	username: string;
	email: string;
	password: string;
	profilePic: string;
	subscriberCount: number;
	subscriptions: string[];
	subscribers: string[];
	fromGoogle: boolean;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export interface GoogleUser {
	username: string;
	email: string;
	profilePic: string;
}

export interface Comment {
	_id: string;
	owner: string;
	description: string;
	videoId: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export enum QueryKeys {
	ME = 'Me',
	VIDEO = 'Video',
	CURRENT_VIDEO = 'currentVideo',
	COMMENTS = 'comments',
	COMMENT_OWNER = 'commentOwner',
	CURRENT_VIDEO_OWNER = 'currentVideoOwner',
	VIDEO_OWNER = 'videoOwner',
	VIDEOS = 'Videos',
	USER = 'User',
	GOOGLE_USER = 'googleUser',
	USERS = 'Users',
	RECOMMENDATIONS = 'Recommendations',
	SEARCH = 'search'
}
