export interface Video {
	_id: string;
	owner: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	description: string;
	title: string;
}
export interface Comment {
	_id: string;
	owner: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	videoId: string;
	title: string;
}

export enum QueryKeys {
	me = 'me',
	videos = 'videos'
}

export interface Me {
	_id: string;
	email: string;
	username: string;
}
