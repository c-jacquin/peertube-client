export interface Channel {
  displayName: string;
  description: string;
  isLocal: boolean;
  ownerAccount: {
    id: number;
    uuid: string;
  };
}

export interface CreateChannelPayload {
  name: string;
  displayName: string;
  description: string;
}
