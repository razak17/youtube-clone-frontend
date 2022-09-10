/* eslint-disable no-unused-vars */
export interface Video {
	_id: string;
	owner: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	videoUrl: string;
	views: number;
	tags: string[];
	likes: string[];
	dislikes: string[];
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

export interface Comment {
	_id: string;
	owner: string;
	title: string;
	videoId: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export enum QueryKeys {
	ME = 'me',
	VIDEOS = 'Videos',
	USER = 'User',
	USERS = 'Users',
}

export enum AppLinks {
	HOME = '/',
	TRENDING = '/trending',
	SUBSCRIPTIONS = '/subscriptions',
	EXPLORE = '/explore'
}
