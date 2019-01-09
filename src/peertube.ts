import { ajax } from './helpers';
import { Account, Avatar, List } from './interfaces/account';
import { Channel, CreateChannelPayload } from './interfaces/channel';
import { Comment } from './interfaces/comment';
import { Config } from './interfaces/config';
import { Server } from './interfaces/server';
import {
  AvatarPayload,
  CreateUserResponse,
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

  getConfig(): Promise<Config> {
    return ajax('/config');
  }

  getAbout(): Promise<string> {
    return ajax('/about');
  }

  getCategories(): Promise<string[]> {
    return ajax('/videos/categories');
  }

  getLicences(): Promise<string[]> {
    return ajax('/videos/licences');
  }

  getLanguages(): Promise<string[]> {
    return ajax('/videos/languages');
  }

  getPrivacies(): Promise<string[]> {
    return ajax('/videos/privacies');
  }

  getChannels(): Promise<List<Channel>> {
    return ajax('/video-channels');
  }

  getAccounts(): Promise<List<Account>> {
    return ajax('/accounts');
  }

  getAccountByName(name: string): Promise<Account> {
    return ajax(`/accounts/${name}`);
  }

  getVideosByAccount(name: string): Promise<List<Video>> {
    return ajax(`/accounts/${name}/videos`);
  }

  getChannelByAccount(name: string): Promise<List<Channel>> {
    return ajax(`/accounts/${name}/video-channels`);
  }

  getVideos(query?: ListVideoParamsFull): Promise<List<Video>> {
    return ajax('/videos', { query });
  }

  getVideo(id: string): Promise<Video> {
    return ajax(`/videos/${id}`);
  }

  getCommentsByVideo(
    id: string,
    query?: BasicListParams,
  ): Promise<List<Comment>> {
    return ajax(`/videos/${id}/comment-threads`, { query });
  }

  getComment(
    id: string,
    commentId: string,
  ): Promise<{
    comment: Comment;
    children: Comment[];
  }> {
    return ajax(`/videos/${id}/comment-threads/${commentId}`);
  }

  getVideoDescription(id: string): Promise<{ description: string }> {
    return ajax(`/videos/${id}/description`);
  }

  getChannel(name: string): Promise<Channel> {
    return ajax(`/video-channels/${name}`);
  }

  getVideoByChannel(id: string): Promise<List<Video>> {
    return ajax(`/video-channels/${id}/video`);
  }

  getFollowers(): Promise<List<Server>> {
    return ajax('/server/followers');
  }

  getFollowedServers(): Promise<List<Server>> {
    return ajax('/server/following');
  }

  getFeed(
    format: 'xml' | 'json' | 'atom',
    query?: { accountId?: string; accountName?: string },
  ): Promise<List<Video>> {
    return ajax(`/feed/videos.${format}`, { query });
  }

  search(query: SearchListParams): Promise<List<Video>> {
    return ajax('/search/videos', { query });
  }

  createUser(body: UserPayload): Promise<CreateUserResponse> {
    return this.authFetch('/users', {
      body,
      method: 'POST',
    });
  }

  getUsers(query?: ListUserParams): Promise<List<User>> {
    return this.authFetch('/users', { query });
  }

  removeUser(id: string): Promise<void> {
    return this.authFetch(`/users/${id}`, { method: 'DELETE' });
  }

  getUser(id: string): Promise<User> {
    return this.authFetch(`/users/${id}`);
  }

  updateUser(id: string, body: UpdateUserPayload): Promise<string> {
    return this.authFetch(`/users/${id}`, { method: 'PUT', body });
  }

  whoAmI(): Promise<User> {
    return this.authFetch('/users/me');
  }

  updateMySelf(body: UpdateMyselfPayload): Promise<string> {
    return this.authFetch('/users/me', { method: 'PUT', body });
  }

  getMyQuota(): Promise<number> {
    return this.authFetch('/users/me/video-quota-used');
  }

  getMyRating(videoId: string): Promise<{ id: string; rating: number }> {
    return this.authFetch(`/users/me/videos/${videoId}/rating`);
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

  deleteVideo(id: string): Promise<Video> {
    return this.authFetch(`/videos/${id}`, { method: 'DELETE' });
  }

  updateVideo(id: string, body: UpdateVideoPayload): Promise<Video> {
    return this.authFetch<Video>(`/videos/${id}`, { method: 'PUT', body });
  }

  setVideoWatchingProgress(
    id: string,
    body: { currentTime: number },
  ): Promise<void> {
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
    return this.authUpload('/videos/upload', {
      method: 'POST',
      body,
    });
  }

  rateVideo(id: string, body: { rate: number }) {
    return this.authFetch(`/videos/${id}/rate`, { method: 'POST', body });
  }

  getreportedVideo(query?: AbuseListParams): Promise<List<Abuse>> {
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

  getBlacklistedVideos(
    query?: BlacklistParams,
  ): Promise<List<BlacklistedVideo>> {
    return this.authFetch(`/videos/blacklist`, { query });
  }

  createComment(id: string, body: { text: string }): Promise<Comment> {
    return this.authFetch(`/videos/${id}/comment-threads`, {
      method: 'POST',
      body,
    });
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

  deleteAnswer(id: string, commentId: string): Promise<void> {
    return this.authFetch(`/videos/${id}/comment-threads/${commentId}`, {
      method: 'DELETE',
    });
  }

  createChannel(body: CreateChannelPayload): Promise<Channel> {
    return this.authFetch<Channel>('/video-channels', { method: 'POST', body });
  }

  updateChannel(id: string, body: CreateChannelPayload): Promise<Channel> {
    return this.authFetch(`/video-channels/${id}`, { method: 'PUT', body });
  }

  removeChannel(id: string): Promise<void> {
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
