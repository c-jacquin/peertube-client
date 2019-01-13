import { BasicListParams } from './video';

export interface UserPayload {
  username: string;
  password: string;
  email: string;
  videoQuota: string;
  role: number;
}

export interface UpdateUserPayload {
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
  autoPlayVideo: boolean;
}

export interface AvatarPayload {
  avatarfile: string;
}

// export interface CreateUserResponse {
//   id: number;
//   uuid: string;
// }

export interface User {
  id: number;
  username: string;
  email: string;
  displayNSFW: boolean;
  role: 0 | 1 | 2;
  createdAt: string;
  autoPlayVideo: boolean;
  videoQuota: number;
  account: Account;
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

export interface ListUserParams extends BasicListParams {
  sort?: '-id' | '-username' | '-createdAt';
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
