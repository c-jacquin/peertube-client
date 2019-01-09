export interface Account {
  id: string;
  uuid: string;
  url: string;
  name: string;
  host: string;
  followingCount: number;
  followersCount: number;
  createdAt: string;
  updatedAt: string;
  avatar: Avatar;
  displayName: string;
}

export interface List<T> {
  total: number;
  data: T[];
}

export interface Avatar {
  path: string;
  createdAt: string;
  updatedAt: string;
}
