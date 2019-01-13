import querystring from 'query-string';

/* tslint:disable */
export interface AjaxOptions extends RequestInit {
  body?: any;
  query?: any;
}
export const ajax = async <T>(
  input: string,
  init?: AjaxOptions,
): Promise<T> => {
  if (init && init.body) {
    init.body = JSON.stringify(init.body);
    init.headers = {
      ['Content-Type']: 'application/json',
      ...init.headers,
    };
  }
  let url = input;
  if (init && init.query) {
    url += `?${querystring.stringify(init.query)}`;
  }
  const res = await fetch(url, init);

  return res.json();
};

export const upload = async <T>(
  input: string,
  init: AjaxOptions,
): Promise<T> => {
  init.body = querystring.stringify(init.body);
  init.headers = {
    ...init.headers,
    ['Content-Type']: 'application/x-www-form-urlencoded',
  };

  const res = await fetch(input, init);

  return res.json();
};

/* tslint:enable */
