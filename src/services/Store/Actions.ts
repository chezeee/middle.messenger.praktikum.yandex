import { store, StateType } from './Store';

const setUserState = (user: StateType['user']) => {
  store.set('user', user);
};

export { setUserState };
