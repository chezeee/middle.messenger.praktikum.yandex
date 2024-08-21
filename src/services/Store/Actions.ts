import { StateModel } from '../../models/StateModel';
import { store } from './Store';

const setUserState = (user: StateModel['user']) => {
  store.set('user', user);
};

const setChatsState = (chats: StateModel['chats']) => {
  store.set('chats', chats);
};

export { setUserState, setChatsState };
