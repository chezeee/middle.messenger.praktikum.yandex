import ChatAPI from '../api/chat-api';
import isResponseError from '../helpers/isResponseError';
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

const chatAPI = new ChatAPI();

const getChats = async (): Promise<
  ResultType<BadRequestModel | ChatModel[]>
> => {
  const response = await chatAPI.getChats();

  if (isResponseError(response)) {
    throw new Error(response.data.reason);
  }

  return response;
};

const createChat = async (
  data: CreateChatModel
): Promise<ResultType<CreateChatResponseModel | BadRequestModel>> => {
  const response = await chatAPI.createChat(data);

  if (isResponseError(response)) {
    throw new Error(response.data.reason);
  }

  return response;
};

const deleteChat = async (
  data: DeleteChatModel
): Promise<ResultType<DeleteChatResponseModel | BadRequestModel>> => {
  const response = await chatAPI.deleteChat(data);

  if (isResponseError(response)) {
    throw new Error(response.data.reason);
  }

  return response;
};

const getChatUsers = async (
  chatId: number
): Promise<ResultType<UserModel | BadRequestModel>> => {
  const response = await chatAPI.getChatUsers(chatId);

  if (isResponseError(response)) {
    throw new Error(response.data.reason);
  }

  return response;
};

const addUsersToChat = async (
  data: AddUsersToChatModel
): Promise<ResultType<BadRequestModel>> => {
  const response = await chatAPI.addUsersToChat(data);

  if (isResponseError(response)) {
    throw new Error(response.data.reason);
  }

  return response;
};

const deleteUsersFromChat = async (
  data: DeleteUsersModel
): Promise<ResultType<BadRequestModel>> => {
  const response = await chatAPI.deleteUsersFromChat(data);

  if (isResponseError(response)) {
    throw new Error(response.data.reason);
  }

  return response;
};

const getChatToken = async (
  chatId: number
): Promise<ResultType<GetChatTokenResponseModel | BadRequestModel>> => {
  const response = await chatAPI.getChatToken(chatId);

  if (isResponseError(response)) {
    throw new Error(response.data.reason);
  }

  return response;
};

export {
  getChats,
  createChat,
  deleteChat,
  getChatUsers,
  addUsersToChat,
  deleteUsersFromChat,
  getChatToken,
};
