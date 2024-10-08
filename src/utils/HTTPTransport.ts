import queryString from '../helpers/queryStringify';

enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type Options = {
  headers?: Record<string, string>;
  method?: METHODS;
  data?: Record<string, unknown> | FormData;
  withCredentials?: boolean;
};

type MethodsHTML = <ResponseType = unknown>(
  url: string,
  options?: Options,
  timeout?: number
) => Promise<ResponseType>;

export default class HTTPTransport {
  baseUrl?: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl;
  }

  get: MethodsHTML = (url, options = {}, timeout) => {
    const fullUrl = options.data ? url + queryString(options.data) : url;
    return this.request(fullUrl, { ...options, method: METHODS.GET }, timeout);
  };
  put: MethodsHTML = (url, options = {}, timeout) => {
    return this.request(url, { ...options, method: METHODS.PUT }, timeout);
  };
  post: MethodsHTML = (url, options = {}, timeout) => {
    return this.request(url, { ...options, method: METHODS.POST }, timeout);
  };
  delete: MethodsHTML = (url, options = {}, timeout) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, timeout);
  };

  request: MethodsHTML = (url, options = {}, timeout = 5000) => {
    const { headers = {}, method, data, withCredentials = true } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const fullUrl = this.baseUrl + url;
      const xhr = new XMLHttpRequest();

      xhr.open(method, fullUrl);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        const status = xhr.status;

        try {
          if (status === 200) {
            resolve(
              xhr.response === 'OK' ? xhr.response : JSON.parse(xhr.response)
            );
          } else {
            reject(JSON.parse(xhr.response));
          }
        } catch (err) {
          console.error(err);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;

      xhr.withCredentials = withCredentials;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
