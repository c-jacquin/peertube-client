export interface Client {
  client_id: string;
  client_secret: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
  expires_in: string;
}
