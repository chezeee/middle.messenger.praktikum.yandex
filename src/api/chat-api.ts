import {
  AddUsersToChatModel,
  ChatModel,
  CreateChatModel,
  CreateChatResponseModel,
  DeleteChatModel,
  DeleteChatResponseModel,
  DeleteUsersModel,
  GetChatTokenResponseModel,
} from '../models/ChatModel';
import { BadRequestModel } from '../models/ErrorModel';
import { UserModel } from '../models/UserModel';
import { ResultType } from '../utils/HTTPTransport';
import BaseAPI, { baseHTTPTransport } from './base-api';

export default class ChatAPI extends BaseAPI {
  async getChats(): Promise<ResultType<ChatModel[] | BadRequestModel>> {
    return baseHTTPTransport.get('/chats');
  }

  async createChat(
    data: CreateChatModel
  ): Promise<ResultType<CreateChatResponseModel | BadRequestModel>> {
    return baseHTTPTransport.post('/chats', { data: data });
  }

  async deleteChat(
    data: DeleteChatModel
  ): Promise<ResultType<DeleteChatResponseModel | BadRequestModel>> {
    return baseHTTPTransport.delete('/chats', { data: data });
  }

  async getChatUsers(
    chatId: number
  ): Promise<ResultType<UserModel | BadRequestModel>> {
    return baseHTTPTransport.get(`/chats/${chatId}/users`);
  }

  async addUsersToChat(
    data: AddUsersToChatModel
  ): Promise<ResultType<BadRequestModel>> {
    return baseHTTPTransport.put('/chats/users', { data: data });
  }

  async deleteUsersFromChat(
    data: DeleteUsersModel
  ): Promise<ResultType<BadRequestModel>> {
    return baseHTTPTransport.delete('/chat/users', { data: data });
  }

  async getChatToken(
    chatId: number
  ): Promise<ResultType<GetChatTokenResponseModel | BadRequestModel>> {
    return baseHTTPTransport.post(`/chats/token/${chatId}`);
  }
}
