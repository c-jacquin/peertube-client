import { Avatar } from './account';

export interface Actor {
  id: number;
  uuid: string;
  url: string;
  name: string;
  host: string;
  followingCount: number;
  followersCount: number;
  createdAt: string;
  updatedAt: string;
  avatar: Avatar;
}

export interface Server {
  id: number;
  follower: Actor;
  following: Actor;
  score: number;
  state: 'pending' | 'accepted';
  createdAt: string;
  updatedAt: string;
}
