import BaseAPI, { baseHTTPTransport } from './base-api';
import { UserModel } from '../models/UserModel';
import { SignInRequestModel, SignUpResponseModel } from '../models/AuthModel';
import { BadRequestModel } from '../models/ErrorModel';

export default class AuthAPI extends BaseAPI {
  async signUp(
    data: UserModel
  ): Promise<SignUpResponseModel | BadRequestModel> {
    return baseHTTPTransport.post<SignUpResponseModel>('/auth/signup', {
      data: data,
    });
  }

  async getUserData(): Promise<UserModel | BadRequestModel> {
    return baseHTTPTransport.get('/auth/user');
  }

  async signIn(data: SignInRequestModel): Promise<unknown | BadRequestModel> {
    return baseHTTPTransport.post('/auth/signin', {
      data: data,
    });
  }

  async logout(): Promise<unknown | BadRequestModel> {
    return baseHTTPTransport.post('/auth/logout');
  }
}
