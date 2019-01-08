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
