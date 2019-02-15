export interface Account {
  id: string;
  uuid: string;
  url: string;
  name: string;
  host: string;
  hostRedundancyAllowed: boolean;
  followingCount: number;
  followersCount: number;
  createdAt: string;
  updatedAt: string;
  avatar?: Avatar;
  displayName: string;
  description?: string;
  userId?: number;
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
