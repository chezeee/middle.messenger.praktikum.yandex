export type SignInRequestModel = {
  [key: string]: string | undefined;
  login?: string;
  password?: string;
};

export type SignUpResponseModel = {
  id: number;
};
