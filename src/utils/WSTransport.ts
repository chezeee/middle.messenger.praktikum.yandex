import { getChatToken } from '../controllers/chat';
import { MessageModel } from '../models/MessageModel';

class WSTransport {
  socket: WebSocket;
  messages: MessageModel[];

  constructor() {
    this.socket;
    this.messages = [];
  }

  public async connect(userId: number, chatId: number) {
    this.messages = [];

    try {
      const token = (await getChatToken(chatId))?.token as string;

      if (token) {
        this.socket = new WebSocket(
          `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
        );
        this.addEvents();
      }
    } catch (error) {
      console.error(error);
    }
  }

  private addEvents() {
    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      this.getOldMessages();
    });

    this.socket.addEventListener('close', (event: CloseEvent) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener('message', (event) => {
      console.log('Получены данные', event.data);
    });
  }

  public getOldMessages() {
    this.socket.send(
      JSON.stringify({
        content: 0,
        type: 'get old',
      })
    );
  }

  public sendMessage(message: string) {
    return this.socket?.send(
      JSON.stringify({
        content: message,
        type: 'message',
      })
    );
  }

  public sendFile(id: number) {
    return this.socket?.send(
      JSON.stringify({
        content: String(id),
        type: 'file',
      })
    );
  }
}

export default WSTransport;
