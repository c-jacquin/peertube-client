import { ajax } from './helpers';
import { Account } from './interfaces/account';
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
import { ListVideoParams, Video } from './interfaces/video';
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

  getAccounts(): Promise<Account[]> {
    return ajax<Account[]>('/accounts');
  }

  getAccountByName(name: string): Promise<Account> {
    return ajax<Account>(`/accounts/${name}`);
  }

  getVideosByAccount(): Promise<Video[]> {
    return ajax<Video[]>(`/accounts/${name}/videos`);
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

  getMyVideos(query: ListVideoParams): Promise<Video[]> {
    return this.authFetch<Video[]>('/users/me/videos', { query });
  }

  getMySubscriptions(query: ListVideoParams): Promise<Subscription[]> {
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

  subscriptionsExist(query: { uris: string[] }) {
    return this.authFetch('/users/me/subscriptions/exist', { query });
  }

  getSubscribedVideos(query: ListVideoParams): Promise<Video[]> {
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
}
