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
import BaseAPI, { baseHTTPTransport } from './base-api';

export default class ChatAPI extends BaseAPI {
  async getChats(): Promise<ChatModel[] | BadRequestModel> {
    return baseHTTPTransport.get('/chats');
  }

  async createChat(
    data: CreateChatModel
  ): Promise<CreateChatResponseModel | BadRequestModel> {
    return baseHTTPTransport.post('/chats', { data: data });
  }

  async deleteChat(
    data: DeleteChatModel
  ): Promise<DeleteChatResponseModel | BadRequestModel> {
    return baseHTTPTransport.delete('/chats', { data: data });
  }

  async getChatUsers(chatId: number): Promise<UserModel[] | BadRequestModel> {
    return baseHTTPTransport.get(`/chats/${chatId}/users`);
  }

  async addUsersToChat(data: AddUsersToChatModel): Promise<BadRequestModel> {
    return baseHTTPTransport.put('/chats/users', { data: data });
  }

  async deleteUsersFromChat(data: DeleteUsersModel): Promise<BadRequestModel> {
    return baseHTTPTransport.delete('/chats/users', { data: data });
  }

  async getChatToken(
    chatId: number
  ): Promise<GetChatTokenResponseModel | BadRequestModel> {
    return baseHTTPTransport.post(`/chats/token/${chatId}`);
  }

  async getNewMessagesCount(chatId: number): Promise<number> {
    return baseHTTPTransport.get(`/chats/new/${chatId}`);
  }
}
