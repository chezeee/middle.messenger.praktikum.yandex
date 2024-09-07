import template from './template.hbs?raw';
import Component from '../../services/Component';
import WSTransport from '../../utils/WSTransport';
import { store } from '../../services/Store/Store';
import ContentForm from '../../components/contentForm';
import ChatCard from '../../components/chatCard';
import ChatList from '../../components/chatList';
import Message from '../../components/message';
import Button from '../../components/button';
import Form from '../../components/form';
import Input from '../../components/input';
import Modal from '../../components/modal';
import Title from '../../components/title';
import MsgSendingForm from '../../components/msgSendingForm';
import { inputValidate } from '../../utils/inputValidate';
import { MESSAGE_REGEXP } from '../../constants/consts-regexp';
import convertDateString from '../../helpers/convertDate';
import {
  addUsersToChat,
  createChat,
  deleteChat,
  deleteUsersFromChat,
  getChats,
  getChatUsers,
} from '../../controllers/chat';
import router from '../../services/Router/Router';
import { ComponentWithStoreProps, Connect } from '../../services/Store/Connect';
import { ChatModel } from '../../models/ChatModel';
import { MessageModel } from '../../models/MessageModel';
import { UserModel } from '../../models/UserModel';
import {
  setChatsState,
  setChatUsersState,
  setCurrentChatIdState,
  setCurrentChatMessages,
} from '../../services/Store/Actions';
import attachFileModal from '../components/AttachFileModal';

import './chat.scss';

const webSocket = new WSTransport();

export const connectToChat = async () => {
  const currentChatId = store.getStateKey('currentChatId');
  setChatsState((await getChats()) as ChatModel[]);
  const user = store.getStateKey('user') as UserModel;

  if (user && currentChatId) {
    try {
      await webSocket.connect(user.id as number, currentChatId as number);

      webSocket.socket.addEventListener(
        'message',
        async (event: MessageEvent) => {
          const messages: MessageModel[] | MessageModel = JSON.parse(
            event.data
          );

          webSocket.messages = Array.isArray(messages)
            ? [...messages.reverse(), ...webSocket.messages]
            : [...webSocket.messages, messages];

          setCurrentChatMessages(webSocket.messages);

          setChatsState((await getChats()) as ChatModel[]);

          const contentFormMsgs = document.querySelector('.content-form__main');
          if (contentFormMsgs) {
            contentFormMsgs.scrollTop = contentFormMsgs.scrollHeight;
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  } else {
    setChatsState((await getChats()) as ChatModel[]);
    setCurrentChatIdState(null);
    setCurrentChatMessages([]);
  }
};

connectToChat();

const createChatModal = new Modal({
  content: [
    new Title({ text: 'Создать чат' }),
    new Form({
      formFields: new Input({
        label: '',
        type: 'text',
        name: 'create_chat',
        placeholder: 'название чата',
        isRequired: true,
        attr: { class: 'form-input-wrap' },
      }),
      button: new Button({
        type: 'submit',
        text: 'Добавить',
        attr: { class: 'button-apply' },
      }),
      attr: { class: 'modal-form-wrap' },
      events: {
        submit: async (evt: Event) => {
          evt.preventDefault();
          const input = (evt?.target as HTMLElement)?.querySelector('input');
          const title = input?.value as string;
          try {
            await createChat({ title: title });

            const chats = (await getChats()) as ChatModel[];
            setChatsState(chats);
            createChatModal.hide();
          } catch (error) {
            console.error(error.message);
          }
        },
      },
    }),
  ],
});

const addUserToChatModal = new Modal({
  content: [
    new Title({ text: 'Добавить пользователей' }),
    new Form({
      formFields: new Input({
        label: '',
        type: 'text',
        name: 'add_user',
        placeholder: 'ID пользователя (несколько через запятую)',
        isRequired: true,
        attr: { class: 'form-input-wrap' },
      }),
      button: new Button({
        type: 'submit',
        text: 'Добавить',
        attr: { class: 'button-apply' },
      }),
      attr: { class: 'modal-form-wrap' },
      events: {
        submit: async (evt: Event) => {
          evt.preventDefault();
          const input = (evt?.target as HTMLElement)?.querySelector('input');
          const usersId = input?.value.split(',').map((id) => Number(id));
          const currentChatId = store.getStateKey('currentChatId') as number;
          try {
            await addUsersToChat({
              users: usersId as number[],
              chatId: currentChatId,
            });

            setChatUsersState(
              (await getChatUsers(currentChatId)) as UserModel[]
            );
          } catch (error) {
            alert(`Не удалось добавить пользователя. Попробуйте ещё раз`);
            console.error(error.message);
          }
          addUserToChatModal.hide();
        },
      },
    }),
  ],
});

const deleteUsersModal = new Modal({
  content: [
    new Title({ text: 'Удалить пользователей из чата' }),
    new Form({
      formFields: new Input({
        label: '',
        type: 'text',
        name: 'delete_user',
        placeholder: 'ID пользователя (несколько через запятую)',
        isRequired: true,
        attr: { class: 'form-input-wrap' },
      }),
      button: new Button({
        type: 'submit',
        text: 'Удалить',
        attr: { class: 'button-apply' },
      }),
      attr: { class: 'modal-form-wrap' },
      events: {
        submit: async (evt: Event) => {
          evt.preventDefault();
          const input = (evt?.target as HTMLElement)?.querySelector('input');
          const usersId = input?.value.split(',').map((id) => Number(id));
          const currentChatId = store.getStateKey('currentChatId') as number;
          try {
            await deleteUsersFromChat({
              users: usersId as number[],
              chatId: currentChatId,
            });

            setChatUsersState(
              (await getChatUsers(currentChatId)) as UserModel[]
            );
          } catch (error) {
            alert(`Не удалось удалить. Попробуйте ещё раз`);
            console.error(error);
          }
          deleteUsersModal.hide();
        },
      },
    }),
  ],
});

const deleteChatModal = new Modal({
  content: [
    new Title({ text: 'Удалить чат?' }),
    new Form({
      button: new Button({
        type: 'submit',
        text: 'Удалить',
        attr: { class: 'button-apply' },
      }),
      attr: { class: 'modal-form-wrap' },
      events: {
        submit: async (evt: Event) => {
          evt.preventDefault();
          const currentChatId = store.getStateKey('currentChatId') as number;
          try {
            await deleteChat({
              chatId: currentChatId,
            });

            setChatsState((await getChats()) as ChatModel[]);
            setCurrentChatIdState(null);
          } catch (error) {
            alert(`Не удалось удалить. Попробуйте ещё раз`);
            console.error(error);
          }
          deleteChatModal.hide();
        },
      },
    }),
  ],
});

const modals = [
  createChatModal,
  addUserToChatModal,
  deleteUsersModal,
  deleteChatModal,
  attachFileModal,
];

const ConnectChatList = Connect(ChatList as never, (state) => {
  return {
    buttonCreate: new Button({
      text: 'Создать чат',
      events: {
        click: () => {
          createChatModal.show();
        },
      },
      attr: { class: 'button-apply content-form-button' },
    }),
    buttonMyProfile: new Button({
      type: 'button',
      text: 'Мой профиль',
      events: {
        click: () => {
          router.go(`/settings?user_ID=${state?.user?.id}`);
        },
      },
      attr: { class: 'button-apply content-form-button' },
    }),
    chatCards: state.user
      ? state.chats.map(
          ({ id, title, last_message }) =>
            new ChatCard({
              title: title,
              date: last_message?.time
                ? convertDateString(last_message?.time as string)
                : '',
              lastMessage: last_message?.content,
              events: {
                click: async () => {
                  setCurrentChatIdState(id);
                  router.go(`/messenger?id=${id}`);
                  setChatUsersState((await getChatUsers(id)) as UserModel[]);
                  await connectToChat();
                },
              },
              attr: {
                class: [
                  'card',
                  id === state.currentChatId ? 'active' : '',
                ].join(' '),
              },
            })
        )
      : '',
  };
});

const chatList = new ConnectChatList();

const connectContentForm = Connect(ContentForm as never, (state) => {
  return {
    idActiveChat: state.currentChatId,
    userList: state.currentChatUsers.map(
      ({ first_name, second_name, display_name }) => {
        return new Button({
          text: display_name
            ? `${display_name}`
            : `${first_name} ${second_name}`,
        });
      }
    ),
    chatOptions: [
      new Button({
        type: 'button',
        text: 'Добавить пользователей',
        attr: { class: 'button-apply content-form-button' },
        events: {
          click: () => {
            addUserToChatModal.show();
          },
        },
      }),
      new Button({
        type: 'button',
        text: 'Удалить пользователей',
        attr: { class: 'button-apply content-form-button' },
        events: {
          click: () => {
            deleteUsersModal.show();
          },
        },
      }),
      new Button({
        type: 'button',
        text: 'Удалить чат',
        attr: { class: 'button-apply content-form-button' },
        events: {
          click: () => {
            deleteChatModal.show();
          },
        },
      }),
    ],
    contentDisplay: state.currentChatMessages.map(
      ({ user_id, time, content }) => {
        return user_id === state?.user?.id
          ? new Message({
              content,
              date: convertDateString(time as string),
              attr: { class: 'message outgoing' },
            })
          : new Message({
              content,
              date: convertDateString(time as string),
              attr: { class: 'message incoming' },
            });
      }
    ),
    msgSendingForm: new MsgSendingForm({
      buttonAttachment: new Button({
        type: 'button',
        text: '',
        attr: { class: 'sending-file-btn' },
        events: {
          click: (evt) => {
            evt.preventDefault();
            attachFileModal.show();
          },
        },
      }),
      name: 'message',
      buttonSubmit: new Button({
        type: 'button',
        text: '',
        attr: { class: 'sending-msg-btn' },
        events: {
          click: (evt: Event) => {
            evt.preventDefault();
            const textArea = document.querySelector(
              '.sending-form__message'
            ) as HTMLTextAreaElement;
            if (
              state.currentChatId &&
              inputValidate(textArea.value, MESSAGE_REGEXP, textArea)
            ) {
              webSocket.sendMessage(textArea.value);
            }
            textArea.value = '';
          },
        },
      }),
    }),
    events: {
      keypress: (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          const textArea = document.querySelector(
            '.sending-form__message'
          ) as HTMLTextAreaElement;

          if (
            state.currentChatId &&
            inputValidate(textArea.value, MESSAGE_REGEXP, textArea)
          ) {
            webSocket.sendMessage(textArea.value);
          }
          textArea.value = '';
        }
      },
    },
  };
});

const contentForm = new connectContentForm();

class ChatPage extends Component {
  constructor(props?: ComponentWithStoreProps) {
    super('section', {
      chatList: chatList,
      contentForm: contentForm,
      modals: modals,
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ChatPage;
