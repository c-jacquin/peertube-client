import { ajax, AjaxOptions } from './helpers';
import { Account, Avatar, List } from './interfaces/account';
import { Channel, CreateChannelPayload } from './interfaces/channel';
import { Comment } from './interfaces/comment';
import { Config } from './interfaces/config';
import { Server } from './interfaces/server';
import {
  AvatarPayload,
  ListUserParams,
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

  fetch<T>(path: string, init?: AjaxOptions): Promise<T> {
    return ajax(`${this.baseUrl}${path}`, init);
  }

  getConfig(): Promise<Config> {
    return this.fetch('/config');
  }

  getAbout(): Promise<string> {
    return this.fetch('/about');
  }

  getCategories(): Promise<string[]> {
    return this.fetch('/videos/categories');
  }

  getLicences(): Promise<string[]> {
    return this.fetch('/videos/licences');
  }

  getLanguages(): Promise<string[]> {
    return this.fetch('/videos/languages');
  }

  getPrivacies(): Promise<string[]> {
    return this.fetch('/videos/privacies');
  }

  getChannels(): Promise<List<Channel>> {
    return this.fetch('/video-channels');
  }

  getAccounts(): Promise<List<Account>> {
    return this.fetch('/accounts');
  }

  getAccountByName(name: string): Promise<Account> {
    return this.fetch(`/accounts/${name}`);
  }

  getVideosByAccount(name: string): Promise<List<Video>> {
    return this.fetch(`/accounts/${name}/videos`);
  }

  getChannelByAccount(name: string): Promise<List<Channel>> {
    return this.fetch(`/accounts/${name}/video-channels`);
  }

  getVideos(query?: ListVideoParamsFull): Promise<List<Video>> {
    return this.fetch('/videos', { query });
  }

  getVideo(id: number): Promise<Video> {
    return this.fetch(`/videos/${id}`);
  }

  getCommentsByVideo(
    id: number,
    query?: BasicListParams,
  ): Promise<List<Comment>> {
    return this.fetch(`/videos/${id}/comment-threads`, { query });
  }

  getComment(
    id: number,
    commentId: number,
  ): Promise<{
    comment: Comment;
    children: Comment[];
  }> {
    return this.fetch(`/videos/${id}/comment-threads/${commentId}`);
  }

  getVideoDescription(id: number): Promise<{ description: string }> {
    return this.fetch(`/videos/${id}/description`);
  }

  getChannel(name: string): Promise<Channel> {
    return this.fetch(`/video-channels/${name}`);
  }

  getVideoByChannel(id: number): Promise<List<Video>> {
    return this.fetch(`/video-channels/${id}/video`);
  }

  getFollowers(): Promise<List<Server>> {
    return this.fetch('/server/followers');
  }

  getFollowedServers(): Promise<List<Server>> {
    return this.fetch('/server/following');
  }

  getFeed(
    format: 'xml' | 'json' | 'atom',
    query?: { accountId?: string; accountName?: string },
  ): Promise<List<Video>> {
    return this.fetch(`/feed/videos.${format}`, { query });
  }

  search(query: SearchListParams): Promise<List<Video>> {
    return this.fetch('/search/videos', { query });
  }

  createUser(body: UserPayload): Promise<void> {
    return this.authFetch('/users', {
      body,
      method: 'POST',
    });
  }

  getUsers(query?: ListUserParams): Promise<List<User>> {
    return this.authFetch('/users', { query });
  }

  removeUser(id: number): Promise<void> {
    return this.authFetch(`/users/${id}`, { method: 'DELETE' });
  }

  getUser(id: number): Promise<User> {
    return this.authFetch(`/users/${id}`);
  }

  updateUser(id: number, body: UpdateUserPayload): Promise<string> {
    return this.authFetch(`/users/${id}`, { method: 'PUT', body });
  }

  whoAmI(): Promise<User> {
    return this.authFetch('/users/me');
  }

  updateMySelf(body: UpdateMyselfPayload): Promise<string> {
    return this.authFetch('/users/me', { method: 'PUT', body });
  }

  getMyQuota(): Promise<{
    videoQuotaUsed: number;
    videoQuotaUsedDaily: number;
  }> {
    return this.authFetch('/users/me/video-quota-used');
  }

  getMyRating(id: number): Promise<{ id: number; rating: number }> {
    return this.authFetch(`/users/me/videos/${id}/rating`);
  }

  getMyVideos(query?: BasicListParams): Promise<List<Video>> {
    return this.authFetch('/users/me/videos', { query });
  }

  getMySubscriptions(query?: BasicListParams): Promise<List<Subscription>> {
    return this.authFetch('/users/me/subscriptions', { query });
  }

  getSubcription(uri: string): Promise<Subscription> {
    return this.authFetch(`/users/me/subscriptions/${uri}`);
  }

  addSubscription(body: {}): Promise<Subscription> {
    return this.authFetch('/users/me/subscription', { method: 'POST', body });
  }

  deleteSubcription(uri: string): Promise<void> {
    return this.authFetch(`/users/me/subscriptions/${uri}`, {
      method: 'DELETE',
    });
  }

  subscriptionsExist(query?: { uris: string[] }): Promise<boolean> {
    return this.authFetch('/users/me/subscriptions/exist', { query });
  }

  getSubscribedVideos(query?: BasicListParams): Promise<List<Video>> {
    return this.authFetch('/users/me/subscriptions/videos', { query });
  }

  registerUser(body: UserRegisterPayload): Promise<User> {
    return this.authFetch('/users/register', { method: 'POST', body });
  }

  updateAvatar(body: AvatarPayload): Promise<Avatar> {
    return this.authUpload('/users/me/avatar/pick', {
      method: 'POST',
      body,
    });
  }

  deleteVideo(id: number): Promise<Video> {
    return this.authFetch(`/videos/${id}`, { method: 'DELETE' });
  }

  updateVideo(id: number, body: UpdateVideoPayload): Promise<Video> {
    return this.authFetch<Video>(`/videos/${id}`, { method: 'PUT', body });
  }

  setVideoWatchingProgress(
    id: number,
    body: { currentTime: number },
  ): Promise<void> {
    return this.authFetch(`/videos/${id}/watching`, { method: 'PUT', body });
  }

  getVideoOwnershipChangeRequest(id: number) {
    return this.authFetch(`/videos/${id}/ownership`);
  }

  acceptVideoOwnershipChange(id: number) {
    return this.authFetch(`/videos/${id}/ownership/accept`);
  }

  refuseVideoOwnershipChange(id: number) {
    return this.authFetch(`/videos/${id}/ownership/refuse`);
  }

  changeVideoOwnership(id: number, body: { username: string }) {
    return this.authFetch(`/videos/${id}/give-ownership`, {
      method: 'POST',
      body,
    });
  }

  uploadVideo(body: UploadVideoPayload): Promise<UploadVideoResponse> {
    return this.authUpload('/videos/upload', {
      method: 'POST',
      body,
    });
  }

  rateVideo(id: number, body: { rate: number }) {
    return this.authFetch(`/videos/${id}/rate`, { method: 'POST', body });
  }

  getreportedVideo(query?: AbuseListParams): Promise<List<Abuse>> {
    return this.authFetch(`/videos/abuse`, { query });
  }

  reportVideo(id: number): Promise<Abuse> {
    return this.authFetch(`/videos/${id}/abuse`);
  }

  blacklistVideo(id: number): Promise<BlacklistedVideo> {
    return this.authFetch(`/videos/${id}/blacklist`);
  }

  removeFromBlacklist(id: number): Promise<void> {
    return this.authFetch(`/videos/${id}/blacklist`, { method: 'DELETE' });
  }

  getBlacklistedVideos(
    query?: BlacklistParams,
  ): Promise<List<BlacklistedVideo>> {
    return this.authFetch(`/videos/blacklist`, { query });
  }

  createComment(id: number, body: { text: string }): Promise<Comment> {
    return this.authFetch(`/videos/${id}/comment-threads`, {
      method: 'POST',
      body,
    });
  }

  answerComment(
    id: number,
    commentId: number,
    body: Comment,
  ): Promise<Comment> {
    return this.authFetch(`/videos/${id}/comment-threads/${commentId}`, {
      method: 'POST',
      body,
    });
  }

  deleteAnswer(id: number, commentId: number): Promise<void> {
    return this.authFetch(`/videos/${id}/comment-threads/${commentId}`, {
      method: 'DELETE',
    });
  }

  createChannel(body: CreateChannelPayload): Promise<Channel> {
    return this.authFetch<Channel>('/video-channels', { method: 'POST', body });
  }

  updateChannel(id: number, body: CreateChannelPayload): Promise<Channel> {
    return this.authFetch(`/video-channels/${id}`, { method: 'PUT', body });
  }

  removeChannel(id: number): Promise<void> {
    return this.authFetch(`/video-channels/${id}`, { method: 'DELETE' });
  }

  followServer(body: Server) {
    return this.authFetch('/server/following', { method: 'POST', body });
  }

  unfollowServer(host: string) {
    return this.authFetch(`/server/following/${host}`, { method: 'DELETE' });
  }

  getJobs(
    state: 'active' | 'completed' | 'failed' | 'waiting' | 'delayed',
    query?: BasicListParams,
  ) {
    return this.authFetch(`job/${state}`, { query });
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
}
