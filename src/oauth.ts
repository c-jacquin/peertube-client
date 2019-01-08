import querystring from 'querystring';

import { ajax, AjaxOptions, upload } from './helpers';
import { Client, Token } from './interfaces/auth';

export interface OauthOptions {
  baseUrl: string;
  user: string;
  password: string;
}

export class OAuth {
  protected user: string;
  private accessToken: string | undefined;
  private clientId: string | undefined;
  private clientSecret: string | undefined;
  private baseUrl: string;
  private password: string;

  constructor({ baseUrl, user, password }: OauthOptions) {
    this.baseUrl = baseUrl;
    this.user = user;
    this.password = password;
  }

  async authenticate() {
    const { client_id, client_secret } = await ajax<Client>(
      '/oauth-clients/local',
    );

    this.clientId = client_id;
    this.clientSecret = client_secret;

    const { access_token } = await ajax<Token>(`${this.baseUrl}/users/token`, {
      method: 'POST',
      body: querystring.stringify({
        client_id,
        client_secret,
        grant_type: 'password',
        response_type: 'code',
        username: this.user,
        password: this.password,
      }),
    });

    this.accessToken = access_token;

    return access_token;
  }

  protected authFetch<T>(input: string, init: AjaxOptions = {}) {
    const headers = {
      ...init.headers,
      Authorization: `Bearer ${this.accessToken}`,
    };

    return ajax<T>(`${this.baseUrl}${input}`, {
      ...init,
      headers,
    });
  }

  protected authUpload<T>(input: string, init: AjaxOptions = {}) {
    const headers = {
      ...init.headers,
      Authorization: `Bearer ${this.accessToken}`,
    };

    return upload<T>(`${this.baseUrl}${input}`, {
      ...init,
      headers,
    });
  }
}
