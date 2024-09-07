import HTTPTransport from '../utils/HTTPTransport';

const MAIN_URL = 'https://ya-praktikum.tech/api/v2';
export const RESOURCES = `${MAIN_URL}/resources/`;

export const baseHTTPTransport = new HTTPTransport(MAIN_URL);

export default class BaseAPI {
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
