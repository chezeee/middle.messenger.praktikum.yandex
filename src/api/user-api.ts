import BaseAPI, { baseHTTPTransport } from './base-api';
import { BadRequestModel } from '../models/ErrorModel';
import {
  PasswordRequestModel,
  UserModel,
  UserRequestByLoginModel,
} from '../models/UserModel';

export default class UserAPI extends BaseAPI {
  async changeUserProfile(
    data: UserModel
  ): Promise<UserModel | BadRequestModel> {
    return baseHTTPTransport.put('/user/profile', { data: data });
  }

  async changeUserAvatar(data: FormData): Promise<UserModel | BadRequestModel> {
    return baseHTTPTransport.put('/user/profile/avatar', { data: data });
  }

  async changeUserPassword(
    data: PasswordRequestModel
  ): Promise<unknown | BadRequestModel> {
    return baseHTTPTransport.put('/user/password', { data: data });
  }

  async getUserByLogin(
    data: UserRequestByLoginModel
  ): Promise<UserModel[] | BadRequestModel> {
    return baseHTTPTransport.post('/user/search', { data: data });
  }
}
