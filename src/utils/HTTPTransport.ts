enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type Options = {
  headers?: Record<string, string>;
  method?: METHODS;
  data?: Record<string, unknown>;
};
type MethodsHTML = (
  url: string,
  options: Options,
  timeout?: number
) => Promise<unknown>;

function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  const keys = Object.keys(data);
  return keys.reduce((acc, key, index) => {
    return `${acc}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export default class HTTPTransport {
  get: MethodsHTML = (url, options = {}, timeout) => {
    return this.request(url, { ...options, method: METHODS.GET }, timeout);
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
    const { headers = {}, method, data } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();

      xhr.open(
        method,
        method === METHODS.GET && !!data ? `${url}${queryStringify(data)}` : url
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data ? JSON.stringify(data) : '');
      }
    });
  };
}
