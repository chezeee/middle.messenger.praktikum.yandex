export type MessageModel = {
  id?: number;
  user_id?: number;
  chat_id?: number;
  time?: string;
  type: string;
  content: string;
  file?: string | null;
};
