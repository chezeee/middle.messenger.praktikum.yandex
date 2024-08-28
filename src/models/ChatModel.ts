import { UserModel } from './UserModel';

export type ChatModel = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: LastMessageModel;
};

export type LastMessageModel = {
  user: UserModel;
  time: string;
  content: string;
};

export type CreateChatModel = {
  title: string;
};

export type CreateChatResponseModel = {
  id: number;
};

export type AddUsersToChatModel = {
  users: number[];
  chatId: number;
};

export type GetChatsParamsModel = {
  offset: number;
  limit: number;
  title: string;
};



export type DeleteChatModel = {
  chatId: number;
};

export type DeleteChatResponseModel = {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
    created_by: number;
  };
};

export type DeleteUsersModel = {
  users: number[];
  chatId: number;
};

export type GetChatTokenResponseModel = {
  token: string;
};
