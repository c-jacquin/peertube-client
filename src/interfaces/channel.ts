import { Avatar } from './account';

export interface Channel {
  id: number;
  url?: string;
  uuid: string;
  name: string;
  host: string;
  hostRedundancyAllowed: boolean;
  followingCount: number;
  followersCount: number;
  avatar?: Avatar;
  createdAt: string;
  updatedAt: string;
  displayName: string;
  description?: string;
  support?: string;
  isLocal: boolean;
  ownerAccount: Account;
}

export interface CreateChannelPayload {
  name: string;
  displayName: string;
  description: string;
}

export interface CreateChannelResponse {
  videoChannel: {
    id: number;
    uuid: string;
  };
}
