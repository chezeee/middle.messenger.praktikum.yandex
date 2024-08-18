import HTTPTransport from '../utils/HTTPTransport';

const BASE_URL = 'https://ya-praktikum.tech/api/v2';
// const RESOURCES_URL = `${BASE_URL}/resources/`;
// const SOCKET_URL = 'wss://ya-praktikum.tech/ws/chats/';

export const baseHTTPTransport = new HTTPTransport(BASE_URL);

export default class BaseAPI {
  // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
  create() {
    throw new Error('Not implemented');
  }

  request() {
    throw new Error('Not implemented');
  }

  update() {
    throw new Error('Not implemented');
  }

  delete() {
    throw new Error('Not implemented');
  }
}
