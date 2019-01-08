export interface UserPayload {
  username: string;
  password: string;
  email: string;
  videoQuota: string;
  role: number;
}

export interface UpdateUserPayload {
  id: string;
  email: string;
  videoQuota: string;
  role: string;
}

export interface UserRegisterPayload {
  username: string;
  password: string;
  email: string;
}

export interface UpdateMyselfPayload {
  password: string;
  email: string;
  displayNSFW: string;
  autoPlayVideo: string;
}

export interface AvatarPayload {
  avatarfile: string;
}

export interface AvatarResponse {
  path: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserResponse {
  id: number;
  uuid: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  displayNSFW: boolean;
  autoPlayVideo: boolean;
  role: 'User';
  videoQuota: number;
  createdAt: string;
  account: {
    id: number;
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
  };
  videoChannels: [
    {
      displayName: string;
      description: string;
      isLocal: boolean;
      ownerAccount: {
        id: number;
        uuid: string;
      };
    }
  ];
}

export interface ListUserParams {
  count?: number;
  start?: number;
  sort?: '-id' | '-username' | '-createdAt';
}

export interface MyRating {
  id: string;
  rating: 0;
}

export interface Subscription {
  displayName: string;
  description: string;
  isLocal: boolean;
  ownerAccount: {
    id: number;
    uuid: string;
  };
}
