import BaseAPI, { baseHTTPTransport } from './base-api';
import { ResultType } from '../utils/HTTPTransport';
import { UserModel } from '../models/UserModel';
import { SignInRequestModel, SignUpResponseModel } from '../models/AuthModel';
import { BadRequestModel } from '../models/ErrorModel';

export default class AuthAPI extends BaseAPI {
  async signUp(
    data: UserModel
  ): Promise<ResultType<SignUpResponseModel | BadRequestModel>> {
    return baseHTTPTransport.post<SignUpResponseModel>('/auth/signup', {
      // headers: { 'Content-type': 'application/json' },
      data: data,
    });
  }

  async getUserData(): Promise<ResultType<UserModel | BadRequestModel>> {
    return baseHTTPTransport.get('/auth/user');
  }

  async signIn(
    data: SignInRequestModel
  ): Promise<ResultType<unknown | BadRequestModel>> {
    return baseHTTPTransport.post('/auth/signin', {
      // headers: { 'Content-type': 'application/json' },
      data: data,
    });
  }

  async logout(): Promise<ResultType<unknown | BadRequestModel>> {
    return baseHTTPTransport.post('/auth/logout');
  }
}
