import { Channel } from './channel';

export interface SimpleItem {
  id: number;
  label: string;
}

export interface Video {
  id: number;
  uuid: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
  category: SimpleItem;
  licence: SimpleItem;
  language: SimpleItem;
  privacy: string;
  description: string;
  duration: number;
  isLocal: boolean;
  name: string;
  thumbnailPath: string;
  previewPath: string;
  embedPath: string;
  views: number;
  likes: number;
  dislikes: number;
  nsfw: boolean;
  account: Partial<Account>;
  channel: Partial<Channel>;
}

export interface BasicListParams {
  count?: number;
  start?: number;
  sort?: string;
}

export interface AbuseListParams extends BasicListParams {
  sort?: '-id' | '-createdAt' | '-state';
}

export interface BlacklistParams extends BasicListParams {
  sort?:
    | '-id'
    | '-name'
    | '-duration'
    | '-views'
    | '-likes'
    | '-dislikes'
    | '-uuid'
    | '-createdAt';
}

export interface SearchListParams extends BasicListParams {
  search: string;
  sort?:
    | '-name'
    | '-duration'
    | '-createdAt'
    | '-publishedAt'
    | '-views'
    | '-likes'
    | '-match';
}

export interface ListVideoParamsFull {
  categoryOneOf?: string | string[];
  count?: number;
  filter?: 'local' | 'all-local';
  languageOneOf?: string | string[];
  licenceOneOf?: number | number[];
  nsfw?: 'true' | 'false';
  sort?:
    | '-name'
    | '-duration'
    | '-createdAt'
    | '-publishedAt'
    | '-views'
    | '-likes'
    | '-trending';
  start?: number;
  tagsAllOf?: string | string[];
  tagsOneOf?: string | string[];
}

export interface UpdateVideoPayload {
  category?: string;
  commentsEnabled?: string;
  description?: string;
  language?: string;
  licence?: string;
  name?: string;
  nsfw?: string;
  previewFile?: string;
  scheduleUpdate?: {
    updateAt: string;
    privacy?: 'Public' | 'Unlisted';
  };
  support?: string;
  tags?: string;
  thumbnailfile?: string;
  waitTranscoding?: string;
}

export interface UploadVideoPayload extends UpdateVideoPayload {
  channelId: string;
  name: string;
  videofile: string;
}

export interface UploadVideoResponse {
  video: {
    id: number;
    uuid: string;
  };
}

export interface Abuse {
  id: number;
  reason: string;
  reporterAccount: Account;
  video: {
    id: number;
    name: string;
    uuid: string;
    url: string;
  };
  createdAt: string;
}

export interface BlacklistedVideo {
  id: number;
  videoId: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  uuid: string;
  description: string;
  duration: number;
  views: number;
  likes: number;
  dislikes: number;
  nsfw: boolean;
}
