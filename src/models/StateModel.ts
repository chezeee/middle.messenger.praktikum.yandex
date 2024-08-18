import { UserModel } from './UserModel';
import { ChatModel } from './ChatModel';

export type StateModel = {
  error?: string | null;
  user?: UserModel | null;
  chats?: ChatModel[];
  chatId?: number | null;
};
