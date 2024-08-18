import AuthAPI from '../api/auth-api';
import isResponseError from '../helpers/isResponseError';
import { UserModel } from '../models/UserModel';
import { SignInRequestModel } from '../models/AuthModel';
import { ResultType } from '../utils/HTTPTransport';
import { store } from '../services/Store/Store';
// import router from '../services/Router/Router';

const authAPI = new AuthAPI();

const signUp = async (data: UserModel) => {
  const response = await authAPI.signUp(data);

  if (isResponseError(response)) {
    throw new Error(response.data.reason);
  }
  // await getUserData();
};

const signIn = async (data: SignInRequestModel) => {
  const response = await authAPI.signIn(data);

  // alert(response?.status);

  if (isResponseError(response)) {
    throw new Error(response.data.reason);
  }
  // await getUserData();
};

const getUserData = async (): Promise<ResultType<UserModel>> => {
  const response = await authAPI.getUserData();

  if (isResponseError(response)) {
    throw new Error(response.data.reason);
  }
  console.log(`Response_data`, response);
  return response;
  // window.store.set({ user: response.data as UserModel });
};

const logout = async () => {
  const response = await authAPI.logout();

  if (isResponseError(response)) {
    throw new Error(response.data.reason);
  }

  store.removeState();
};

export { signUp, signIn, getUserData, logout };
