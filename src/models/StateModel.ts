import { UserModel } from './UserModel';
import { ChatModel } from './ChatModel';
import { MessageModel } from './MessageModel';

export type StateModel = {
  user: UserModel | null;
  chats: ChatModel[];
  currentChatId: number | null;
  currentChatUsers: UserModel[];
  currentChatMessages: MessageModel[];
};
