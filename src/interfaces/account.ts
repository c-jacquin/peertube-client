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
  avatar: {
    path: string;
    createdAt: string;
    updatedAt: string;
  };
  displayName: string;
}
