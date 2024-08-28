import UserAPI from '../api/user-api';
import isResponseError from '../helpers/isResponseError';
import { BadRequestModel } from '../models/ErrorModel';
import {
  PasswordRequestModel,
  UserModel,
  UserRequestByLoginModel,
} from '../models/UserModel';

const userAPI = new UserAPI();

const changeUserProfile = async (
  data: UserModel
): Promise<UserModel | BadRequestModel> => {
  const response = await userAPI.changeUserProfile(data);

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }

  return response;
};

const changeUserAvatar = async (
  data: FormData
): Promise<UserModel | BadRequestModel> => {
  const response = await userAPI.changeUserAvatar(data);

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }

  return response;
};

const changeUserPassword = async (
  data: PasswordRequestModel
): Promise<unknown | BadRequestModel> => {
  const response = await userAPI.changeUserPassword(data);

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }

  return response;
};

const getUserByLogin = async (
  data: UserRequestByLoginModel
): Promise<UserModel[] | BadRequestModel> => {
  const response = await userAPI.getUserByLogin(data);

  if (isResponseError(response)) {
    throw new Error(response.reason);
  }

  return response;
};

export {
  changeUserProfile,
  changeUserAvatar,
  changeUserPassword,
  getUserByLogin,
};
