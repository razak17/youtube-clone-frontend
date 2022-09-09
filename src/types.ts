export interface Video {
	_id: string;
  owner: string;
  title: string;
  description: string;
	views: number;
	__v: number;
  createdAt: Date;
  updatedAt: Date;
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
	me = 'me',
	videos = 'Videos'
}

export interface Me {
	_id: string;
	email: string;
	username: string;
}
