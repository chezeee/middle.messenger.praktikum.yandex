import EventBus from '../EventBus.ts';
// import set from '../../helpers/set.ts';
import { UserModel } from '../../models/UserModel.ts';
import { ResultType } from '../../utils/HTTPTransport.ts';

export type StateType = {
  user: UserModel | null | ResultType<UserModel>;
};

export enum StoreEvents {
  Updated = 'updated',
}

const initState: StateType = {
  user: null,
};

class Store extends EventBus {
  // static _instance: Store;

  private _state: StateType = {
    user: null,
  };

  constructor() {
    super();
    this._state = initState;
    this.on(StoreEvents.Updated, () => {
      localStorage.setItem('YPmessenger', JSON.stringify(this._state));
    });
  }

  public getState(): StateType {
    return this._state;
  }

  public set<T extends keyof StateType>(path: T, value: StateType[T]) {
    // set(this._state, path, value);
    this._state[path] = value;
    this.emit(StoreEvents.Updated);

    // const oldState = { ...this.state };
    // this.state = { ...oldState, ...newState };
  }

  public removeState() {
    this._state = initState;
    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store();

// export class Store<State extends Record<string, unknown>> extends EventBus {
//   state: State = {} as State;

//   constructor(initState: State) {
//     super();
//     this.state = initState;
//     this.set(this.state);
//   }

//   getState() {
//     return this.state;
//   }

//   set(nextState: Partial<State>) {
//     const prevState = { ...this.state };
//     this.state = { ...this.state, ...nextState };
//     this.emit(StoreEvents.Updated, prevState, nextState);
//   }
// }

// export class Store<State extends Record<string, unknown>> extends EventBus {
//   private state: State = {} as State;

//   constructor(state: State) {
//     super();
//     this.state = state;
//     this.set(this.state);
//   }

//   public getState() {
//     return this.state;
//   }

//   public set(newState: State) {
//     const oldState = { ...this.state };
//     this.state = { ...oldState, ...newState };
//     this.emit(StoreEvents.Updated, oldState, newState);
//   }
// }