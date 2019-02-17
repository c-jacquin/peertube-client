const querystring = (params: Record<string, string>): string => {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};

const formdata = (obj: Record<string, string>): FormData => {
  const formData = new FormData();
  Object.keys(obj).forEach(key => formData.append(key, obj[key]));

  return formData;
};

export interface AjaxOptions {
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  query?: {};
  body?: {};
  headers?: {};
}
export const ajax = async <T>(
  input: string,
  init?: AjaxOptions,
): Promise<T> => {
  let options;
  if (init && init.body) {
    options = {
      method: init.method || 'POST',
      body: querystring(init.body),
      headers: {
        ['Content-Type']: 'application/x-www-form-urlencoded',
        ...(init.headers ? init.headers : {}),
      },
    };
  }

  let url = input;
  if (init && init.query) {
    url += `?${querystring(init.query)}`;
  }

  const res = await fetch(url, options);

  if (res.ok) return res.json();
  else throw await res.text();
};

export interface UploadOptions {
  body: {};
  headers?: {};
}

export const upload = async <T>(
  input: string,
  init: UploadOptions,
): Promise<T> => {
  const res = await fetch(input, {
    ...init,
    method: 'POST',
    body: formdata(init.body),
  });
  if (res.ok) return res.json();
  else throw await res.text();
};
