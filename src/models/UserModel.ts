export type UserModel = {
  [key: string]: string | number | undefined;
  first_name?: string;
  second_name?: string;
  email?: string;
  phone?: string;
  login?: string;
  display_name?: string;
  avatar?: string;
  password?: string;
  id?: number;
};

export type PasswordRequestModel = {
  oldPassword: string;
  newPassword: string;
};
