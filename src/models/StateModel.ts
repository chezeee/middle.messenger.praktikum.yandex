import { UserModel } from './UserModel';
import { ChatModel } from './ChatModel';
import { MessageModel } from './MessageModel';

export type StateModel = {
  user: UserModel | null;
  chats: ChatModel[];
  currentChat: ChatModel | null;
  currentChatId: number | null;
  currentChatUsers: UserModel[];
  currentChatMessages: MessageModel[];
};
