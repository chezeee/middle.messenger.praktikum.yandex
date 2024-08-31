import { ResourcesModel } from './ResourcesModel';

export type MessageModel = {
  id: number;
  user_id: number;
  chat_id: number;
  time: string;
  type: string;
  content: string;
  file: ResourcesModel | null;
};
