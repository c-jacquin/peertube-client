import { ajax } from './helpers';
import { Account } from './interfaces/account';
import { Channel, CreateChannelPayload } from './interfaces/channel';
import { CommentResponse, CommentsResponse } from './interfaces/comment';
import { Config } from './interfaces/config';
import { FollowServer } from './interfaces/server';
import {
  AvatarPayload,
  AvatarResponse,
  CreateUserResponse,
  ListUserParams,
  MyRating,
  Subscription,
  UpdateMyselfPayload,
  UpdateUserPayload,
  User,
  UserPayload,
  UserRegisterPayload,
} from './interfaces/user';
import {
  Abuse,
  AbuseListParams,
  BasicListParams,
  BlacklistedVideo,
  BlacklistParams,
  ListVideoParamsFull,
  SearchListParams,
  UpdateVideoPayload,
  UploadVideoPayload,
  UploadVideoResponse,
  Video,
} from './interfaces/video';
import { OAuth } from './oauth';

interface PeertubeOptions {
  instance: string;
  user: string;
  password: string;
}

export class Peertube extends OAuth {
  constructor({ instance, password, user }: PeertubeOptions) {
    super({
      user,
      password,
      baseUrl: `https://${instance}/api/v1`,
    });
  }

  getConfig(): Promise<Config> {
    return ajax('/config');
  }

  getAbout() {
    return ajax('/about');
  }

  getRuntimeConfig() {
    return this.authFetch('/config/custom');
  }

  setRuntimeConfig(body: Config) {
    return this.authFetch('/config/custom', { method: 'PUT', body });
  }

  removeRuntimeConfig() {
    return this.authFetch('/config/custom', { method: 'DELETE' });
  }

  getCategories(): Promise<string[]> {
    return ajax<string[]>('/videos/categories');
  }

  getLicences(): Promise<string[]> {
    return ajax<string[]>('/videos/licences');
  }

  getLanguages(): Promise<string[]> {
    return ajax<string[]>('/videos/languages');
  }

  getPrivacies(): Promise<string[]> {
    return ajax<string[]>('/videos/privacies');
  }

  getChannels(): Promise<Channel[]> {
    return ajax<Channel[]>('/video-channels');
  }

  getAccounts(): Promise<Account[]> {
    return ajax<Account[]>('/accounts');
  }

  getAccountByName(name: string): Promise<Account> {
    return ajax<Account>(`/accounts/${name}`);
  }

  getVideosByAccount(name: string): Promise<Video[]> {
    return ajax<Video[]>(`/accounts/${name}/videos`);
  }

  getChannelByAccount(name: string): Promise<Channel[]> {
    return ajax<Channel[]>(`/accounts/${name}/video-channels`);
  }

  createUser(body: UserPayload): Promise<CreateUserResponse> {
    return this.authFetch<CreateUserResponse>('/users', {
      body,
      method: 'POST',
    });
  }

  getUsers(query?: ListUserParams): Promise<User[]> {
    return this.authFetch<User[]>('/users', {
      query,
    });
  }

  removeUser(id: string): Promise<void> {
    return this.authFetch(`/users/${id}`, { method: 'DELETE' });
  }

  getUser(id: string): Promise<User> {
    return this.authFetch<User>(`/users/${id}`);
  }

  updateUser(id: string, body: UpdateUserPayload): Promise<string> {
    return this.authFetch<string>(`/users/${id}`, { method: 'PUT', body });
  }

  whoAmI(): Promise<User> {
    return this.authFetch<User>('/users/me');
  }

  updateMySelf(body: UpdateMyselfPayload): Promise<string> {
    return this.authFetch<string>('/users/me', { method: 'PUT', body });
  }

  getMyQuota(): Promise<number> {
    return this.authFetch<number>('/users/me/video-quota-used');
  }

  getMyRating(videoId: string) {
    return this.authFetch<MyRating>(`/users/me/videos/${videoId}/rating`);
  }

  getMyVideos(query?: BasicListParams): Promise<Video[]> {
    return this.authFetch<Video[]>('/users/me/videos', { query });
  }

  getMySubscriptions(query?: BasicListParams): Promise<Subscription[]> {
    return this.authFetch<Subscription[]>('/users/me/subscriptions', { query });
  }

  getSubcription(uri: string): Promise<Subscription> {
    return this.authFetch(`/users/me/subscriptions/${uri}`);
  }

  addSubscription(body: {}) {
    return this.authFetch('/users/me/subscription', { method: 'POST', body });
  }

  deleteSubcription(uri: string): Promise<Subscription> {
    return this.authFetch(`/users/me/subscriptions/${uri}`, {
      method: 'DELETE',
    });
  }

  subscriptionsExist(query?: { uris: string[] }) {
    return this.authFetch('/users/me/subscriptions/exist', { query });
  }

  getSubscribedVideos(query?: BasicListParams): Promise<Video[]> {
    return this.authFetch<Video[]>('/users/me/subscriptions/videos', { query });
  }

  registerUser(body: UserRegisterPayload): Promise<User> {
    return this.authFetch<User>('/users/register', { method: 'POST', body });
  }

  updateAvatar(body: AvatarPayload): Promise<AvatarResponse> {
    return this.authUpload<AvatarResponse>('/users/me/avatar/pick', {
      method: 'POST',
      body,
    });
  }

  getVideos(query?: ListVideoParamsFull): Promise<Video[]> {
    return ajax<Video[]>('/videos', { query });
  }

  getVideo(id: string): Promise<Video> {
    return this.authFetch(`/videos/${id}`);
  }

  deleteVideo(id: string): Promise<Video> {
    return this.authFetch(`/videos/${id}`, { method: 'DELETE' });
  }

  updateVideo(id: string, body: UpdateVideoPayload): Promise<Video> {
    return this.authFetch<Video>(`/videos/${id}`, { method: 'PUT', body });
  }

  setVideoWatchingProgress(id: string, body: { currentTime: number }) {
    return this.authFetch(`/videos/${id}/watching`, { method: 'PUT', body });
  }

  getVideoOwnershipChangeRequest(id: string) {
    return this.authFetch(`/videos/${id}/ownership`);
  }

  acceptVideoOwnershipChange(id: string) {
    return this.authFetch(`/videos/${id}/ownership/accept`);
  }

  refuseVideoOwnershipChange(id: string) {
    return this.authFetch(`/videos/${id}/ownership/refuse`);
  }

  changeVideoOwnership(id: string, body: { username: string }) {
    return this.authFetch(`/videos/${id}/give-ownership`, {
      method: 'POST',
      body,
    });
  }

  uploadVideo(body: UploadVideoPayload): Promise<UploadVideoResponse> {
    return this.authUpload<UploadVideoResponse>('/videos/upload', {
      method: 'POST',
      body,
    });
  }

  rateVideo(id: string, body: { rate: number }) {
    return this.authFetch(`/videos/${id}/rate`, { method: 'POST', body });
  }

  getreportedVideo(query?: AbuseListParams): Promise<Abuse[]> {
    return this.authFetch(`/videos/abuse`, { query });
  }

  reportVideo(id: string): Promise<Abuse> {
    return this.authFetch(`/videos/${id}/abuse`);
  }

  blacklistVideo(id: string): Promise<BlacklistedVideo> {
    return this.authFetch(`/videos/${id}/blacklist`);
  }

  removeFromBlacklist(id: string): Promise<void> {
    return this.authFetch(`/videos/${id}/blacklist`, { method: 'DELETE' });
  }

  getBlacklistedVideos(query?: BlacklistParams): Promise<BlacklistedVideo[]> {
    return this.authFetch(`/videos/blacklist`, { query });
  }

  getCommentsByVideo(
    id: string,
    query?: BasicListParams,
  ): Promise<CommentsResponse> {
    return ajax(`/videos/${id}/comment-threads`, { query });
  }

  createComment(id: string, body: { text: string }): Promise<Comment> {
    return this.authFetch(`/videos/${id}/comment-threads`, {
      method: 'POST',
      body,
    });
  }

  getComment(id: string, commentId: string): Promise<CommentResponse> {
    return ajax(`/videos/${id}/comment-threads/${commentId}`);
  }

  answerComment(
    id: string,
    commentId: string,
    body: Comment,
  ): Promise<Comment> {
    return this.authFetch(`/videos/${id}/comment-threads/${commentId}`, {
      method: 'POST',
      body,
    });
  }

  deleteAnswer(id: string, commentId: string): Promise<CommentResponse> {
    return this.authFetch(`/videos/${id}/comment-threads/${commentId}`, {
      method: 'DELETE',
    });
  }

  getVideoDescription(id: string): Promise<string> {
    return ajax<string>(`/videos/${id}/description`);
  }

  createChannel(body: CreateChannelPayload): Promise<Channel> {
    return this.authFetch<Channel>('/video-channels', { method: 'POST', body });
  }

  getChannel(id: string): Promise<Channel> {
    return ajax<Channel>(`/video-channels/${id}`);
  }

  updateChannel(id: string, body: CreateChannelPayload): Promise<Channel> {
    return this.authFetch(`/video-channels/${id}`, { method: 'PUT', body });
  }

  removeChannel(id: string): Promise<void> {
    return this.authFetch(`/video-channels/${id}`, { method: 'DELETE' });
  }

  getVideoByChannel(id: string): Promise<Video[]> {
    return ajax(`/video-channels/${id}/video`);
  }

  followServer(body: FollowServer) {
    return this.authFetch('/server/following', { method: 'POST', body });
  }

  unfollowServer(host: string) {
    return this.authFetch(`/server/following/${host}`, { method: 'DELETE' });
  }

  getFollowers(): Promise<FollowServer[]> {
    return ajax('/server/followers');
  }

  getFollowedServers(): Promise<FollowServer[]> {
    return ajax('/server/following');
  }

  getFeed(
    format: 'xml' | 'json' | 'atom',
    query?: { accountId?: string; accountName?: string },
  ): Promise<Video[]> {
    return ajax(`/feed/videos.${format}`, { query });
  }

  getJobs(
    state: 'active' | 'completed' | 'failed' | 'waiting' | 'delayed',
    query?: BasicListParams,
  ) {
    return this.authFetch(`job/${state}`, { query });
  }

  search(query: SearchListParams): Promise<Video[]> {
    return ajax('/search/videos', { query });
  }
}
