import { BadRequestModel } from '../models/ErrorModel';
import { ResourcesModel } from '../models/ResourcesModel';
import BaseAPI, { baseHTTPTransport } from './base-api';

export default class ResourcesAPI extends BaseAPI {
  async uploadResource(
    data: FormData
  ): Promise<ResourcesModel | BadRequestModel> {
    return baseHTTPTransport.post('/resources', { data: data });
  }
}
