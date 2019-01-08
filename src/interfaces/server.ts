export interface Actor {
  id: number;
  uuid: 'string';
  url: 'string';
  name: 'string';
  host: 'string';
  followingCount: number;
  followersCount: number;
  createdAt: 'string';
  updatedAt: 'string';
  avatar: {};
}

export interface FollowServer {
  id: number;
  follower: Actor;
  following: Actor;
  score: number;
  state: 'pending' | 'accepted';
  createdAt: string;
  updatedAt: string;
}
