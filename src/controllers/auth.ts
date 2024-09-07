import AuthAPI from '../api/auth-api';
import isResponseError from '../helpers/isResponseError';
import { UserModel } from '../models/UserModel';
import { SignInRequestModel } from '../models/AuthModel';
// import router from '../services/Router/Router';

const authAPI = new AuthAPI();

const signUp = async (data: UserModel) => {
  const response = await authAPI.signUp(data);

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }
};

const signIn = async (data: SignInRequestModel) => {
  const response = await authAPI.signIn(data);

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }
};

const getUserData = async (): Promise<UserModel> => {
  const response = await authAPI.getUserData();

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }
  return response;
};

const logout = async () => {
  const response = await authAPI.logout();

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }
};

export { signUp, signIn, getUserData, logout };
