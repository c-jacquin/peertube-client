const querystring = (obj: Record<string, string>): string => {
  return Object.keys(obj).reduce((acc, key) => `${acc}&${key}=${obj[key]}`, '');
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
  const json = await res.json();
  if (res.ok) {
    return json as T;
  } else {
    throw json;
  }
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
  const json = await res.json();
  if (res.ok) return json as T;
  else throw json as Error;
};
