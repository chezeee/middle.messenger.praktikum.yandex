import template from './template.hbs?raw';
import Component from '../../services/Component';
// import HTTPTransport from '../../utils/HTTPTransport';
import ContentForm from '../../components/contentForm';
import ChatCard from '../../components/chatCard';
import ChatList from '../../components/chatList';
import Message from '../../components/message';
import Button from '../../components/button';
import MsgSendingForm from '../../components/msgSendingForm';
import data from '../../data.json';
import { inputValidate } from '../../utils/inputValidate';
import { MESSAGE_REGEXP } from '../../constants/consts-regexp';

import './chat.scss';

// const requests = new HTTPTransport();
// const response: Promise<Record<string, unknown>[]> = requests
//   .get('/data.json', { headers: { 'Content-Type': 'application/json' } })
//   .then((data: XMLHttpRequest) => {
//     return JSON.parse(data.response).chat.chatList;
//   });constresponse
// response.then((data) => {
//   data.forEach(
//     ({ title, messages }: Record<string, Record<string, string>[]>) => {
//       chatCards.push(
//         new ChatCard({
//           title: title,
//           date: `${messages[messages.length - 1].date}`,
//           lastMessage: `${messages[messages.length - 1].content}`,
//         })
//       );
//     }
//   );
// });
// console.log('chatCards', chatCards);
// Не удаётся отрендерить массив компонентов "chatCards", полученный через GET запрос из data.json.
//(реализовал закомментированным кодом выше)
// Возможно проблема с ассинхронным получением данных, но с её решением не успел разобраться.
const contentForm = new ContentForm({
  buttonChatOpts: new Button({ text: 'Опции' }),
  msgSendingForm: new MsgSendingForm({
    buttonAttachment: new Button({ type: 'button', text: 'Прикрепить' }),
    name: 'message',
    buttonSmiles: new Button({ type: 'button', text: 'Смайлы' }),
    ButtonSubmit: new Button({
      type: 'submit',
      text: 'Отправить',
    }),
    events: {
      submit: (evt) => {
        evt.preventDefault();
        const date = new Date();
        const textArea = (
          document.querySelector(
            '.sending-form__message'
          ) as HTMLTextAreaElement
        );
        data.chat.chatList.forEach((chat) => {
          if (chat.id === contentForm.props.idActiveChat && 
            inputValidate(textArea.value, MESSAGE_REGEXP, textArea)) {
            chat.messages.push({
              outgoing: true,
              date: `${date.getHours()}:${date.getMinutes()}`,
              content: textArea.value,
            });
            console.log({
              'content': textArea.value, 
              "outgoing": true, 
              "date": `${date.getHours()}:${date.getMinutes()}`,
            });
          }
          textArea.value = '';
          return;
        });
      },
    },
  }),
});
const chatCards: Component[] = data.chat.chatList.map(
  ({ id, title, messages }) =>
    new ChatCard({
      title: title,
      date: messages[messages.length - 1].date,
      lastMessage: messages[messages.length - 1].content,
      attr: { id: `${id}` },
      events: {
        click: (evt: Event) => {
          document
            .querySelectorAll('.card')
            .forEach((card) => card.classList.remove('active'));
          (evt.target as HTMLElement)
            .closest('div.card')
            ?.classList.add('active');

          const contentDisplay = messages.map(({ outgoing, date, content }) => {
            if (outgoing) {
              return new Message({
                content,
                date,
                attr: { class: 'message outgoing' },
              });
            }
            return new Message({
              content,
              date,
              attr: { class: 'message incoming' },
            });
          });

          contentForm.setProps({
            idActiveChat: id,
            contentDisplay: contentDisplay,
          });
        },
      },
    })
);

class Chat extends Component {
  render() {
    return this.compile(template, this.props);
  }
}

export const ChatPage = new Chat('section', {
  chatList: new ChatList({
    buttonCreate: new Button({ text: 'Создать чат' }),
    buttonMyProfile: new Button({
      type: 'button',
      text: 'Мой профиль',
      attr: { onclick: "window.location='/profile'" },
    }),
    chatCards: chatCards,
  }),

  contentForm: contentForm,
});
