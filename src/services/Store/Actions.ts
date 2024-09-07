import { StateModel } from '../../models/StateModel';
import { store } from './Store';

const setUserState = (user: StateModel['user']) => {
  store.set('user', user);
};

const setChatsState = (chats: StateModel['chats']) => {
  store.set('chats', chats);
};

const setCurrentChatIdState = (currentChatId: StateModel['currentChatId']) => {
  store.set('currentChatId', currentChatId);
};

const setChatUsersState = (
  currentChatUsers: StateModel['currentChatUsers']
) => {
  store.set('currentChatUsers', currentChatUsers);
};

const setCurrentChatMessages = (
  currentChatMessages: StateModel['currentChatMessages']
) => {
  store.set('currentChatMessages', currentChatMessages);
};

export {
  setUserState,
  setChatsState,
  setCurrentChatIdState,
  setChatUsersState,
  setCurrentChatMessages,
};
