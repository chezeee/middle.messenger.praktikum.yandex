import { UserModel } from './UserModel';
import { ChatModel } from './ChatModel';
import { ResultType } from '../utils/HTTPTransport';
import { BadRequestModel } from './ErrorModel';

export type StateModel = {
  error: string | null;
  user: UserModel | null | ResultType<UserModel | BadRequestModel>;
  chats: ChatModel[] | [] | ResultType<ChatModel[] | BadRequestModel>;
  chatId: number | null;
};
