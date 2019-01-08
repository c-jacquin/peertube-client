export interface Video {
  id: number;
  uuid: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
  category: {
    id: number;
    label: string;
  };
  licence: {
    id: number;
    label: string;
  };
  language: {
    id: string;
    label: string;
  };
  privacy: string;
  description: string;
  duration: number;
  isLocal: true;
  name: string;
  thumbnailPath: string;
  previewPath: string;
  embedPath: string;
  views: number;
  likes: number;
  dislikes: number;
  nsfw: true;
  account: {
    name: string;
    displayName: string;
    url: string;
    host: string;
    avatar: {
      path: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface ListVideoParams {
  count?: number;
  start?: number;
  sort?: string;
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
