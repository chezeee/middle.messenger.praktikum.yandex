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

const chatAPI = new ChatAPI();

const getChats = async (): Promise<BadRequestModel | ChatModel[]> => {
  const response = await chatAPI.getChats();

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }

  return response;
};

const createChat = async (
  data: CreateChatModel
): Promise<CreateChatResponseModel | BadRequestModel> => {
  const response = await chatAPI.createChat(data);

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }

  return response;
};

const deleteChat = async (
  data: DeleteChatModel
): Promise<DeleteChatResponseModel | BadRequestModel> => {
  const response = await chatAPI.deleteChat(data);

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }

  return response;
};

const getChatUsers = async (
  chatId: number
): Promise<UserModel[] | BadRequestModel> => {
  const response = await chatAPI.getChatUsers(chatId);

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }

  return response;
};

const addUsersToChat = async (data: AddUsersToChatModel) => {
  const response = await chatAPI.addUsersToChat(data);

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }
};

const deleteUsersFromChat = async (
  data: DeleteUsersModel
): Promise<BadRequestModel> => {
  const response = await chatAPI.deleteUsersFromChat(data);

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }

  return response;
};

const getChatToken = async (
  chatId: number
): Promise<GetChatTokenResponseModel> => {
  const response = await chatAPI.getChatToken(chatId);

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }

  return response;
};

const getNewMessagesCount = async (chatId: number): Promise<number> => {
  const response = await chatAPI.getNewMessagesCount(chatId);

  if (isResponseError(response)) {
    throw new Error(response.reason);
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
  getNewMessagesCount,
};
