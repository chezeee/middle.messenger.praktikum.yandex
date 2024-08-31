import EventBus from '../EventBus.ts';
import { StateModel } from '../../models/StateModel.ts';
import { merge } from '../../helpers/merge.ts';

export enum StoreEvents {
  Updated = 'updated',
}

const storageName: string = 'YPmessenger';

const initState: StateModel = {
  user: null,
  chats: [],
  currentChat: null,
  currentChatId: null,
  currentChatUsers: [],
  currentChatMessages: [],
};

class Store extends EventBus {
  private _state: StateModel = {
    user: null,
    chats: [],
    currentChat: null,
    currentChatId: null,
    currentChatUsers: [],
    currentChatMessages: [],
  };

  constructor() {
    super();

    this._state;

    const savedState = localStorage.getItem(storageName);

    this._state = merge(
      this._state,
      savedState ? JSON.parse(savedState ?? '') : {}
    );

    this.on(StoreEvents.Updated, () => {
      localStorage.setItem(storageName, JSON.stringify(this._state));
    });
  }

  public getState(): StateModel {
    return this._state;
  }

  public getStateKey<T extends keyof StateModel>(
    key: T
  ): StateModel[T] | StateModel {
    return key ? this._state[key] : this._state;
  }

  public set<T extends keyof StateModel>(path: T, value: StateModel[T]) {
    this._state[path] = value;
    this.emit(StoreEvents.Updated);
  }

  public removeState() {
    this._state = initState;
    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store();
