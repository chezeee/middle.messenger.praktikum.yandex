import template from './template.hbs?raw';
import Component from '../../../services/Component';
import Title from '../../../components/title';
import Input from '../../../components/input';
import Form from '../../../components/form';
import Button from '../../../components/button';
import Link from '../../../components/link';
import * as REGEXP from '../../../constants/consts-regexp';
import { inputValidate } from '../../../utils/inputValidate';
import { getUserData, signIn } from '../../../controllers/auth';
import { SignInRequestModel } from '../../../models/AuthModel';
import { setChatsState, setUserState } from '../../../services/Store/Actions';
import router from '../../../services/Router/Router';
import { getChats } from '../../../controllers/chat';
import { ChatModel } from '../../../models/ChatModel';

import '../auth.scss';
import './login.scss';

const formFields = [
  new Input({
    label: 'Логин',
    type: 'text',
    name: 'login',
    placeholder: 'логин',
    attr: { class: 'form-input-wrap' },
  }),
  new Input({
    label: 'Пароль',
    type: 'password',
    name: 'password',
    placeholder: 'пароль',
    attr: { class: 'form-input-wrap' },
  }),
];

// store.removeState();

export default class LoginPage extends Component {
  constructor() {
    super('section', {
      title: new Title({
        text: 'Вход',
      }),
      form: new Form({
        formFields,
        button: new Button({
          text: 'Войти',
          attr: { type: 'submit', class: 'button-apply' },
        }),
        attr: { class: 'auth-form-login' },
        events: {
          blur: (evt) => {
            const input = evt.target as HTMLInputElement;
            if (input.name === 'password') {
              inputValidate(input.value, REGEXP.PASSWORD_REGEXP, input);
            } else if (input.name === 'login') {
              inputValidate(input.value, REGEXP.LOGIN_REGEXP, input);
            }
          },
          submit: async (evt) => {
            evt.preventDefault();

            let result: boolean = true;
            const output: SignInRequestModel = {};
            const inputs = (evt.target as HTMLElement)?.querySelectorAll(
              'input'
            );

            inputs.forEach((input) => {
              switch (input.name) {
                case 'login':
                  if (
                    input.value !== '' &&
                    inputValidate(input.value, REGEXP.LOGIN_REGEXP, input)
                  ) {
                    break;
                  }
                  result = false;
                  break;
                case 'password':
                  if (
                    input.value !== '' &&
                    inputValidate(input.value, REGEXP.PASSWORD_REGEXP, input)
                  ) {
                    break;
                  }
                  result = false;
              }
            });

            if (result) {
              inputs.forEach((input) => {
                output[`${input.name}`] = input.value;
              });

              try {
                await signIn(output);
                const user = await getUserData();
                setUserState(user);
                setChatsState((await getChats()) as ChatModel[]);
                router.go('/messenger');
              } catch (error) {
                console.error('Error: ', error.message);
                alert(
                  'Не удалось авторизоваться. Логин или пароль указаны неверно'
                );
              }
            }
          },
        },
      }),

      link: new Link({
        text: 'Вы ещё не зарегистрированы?',
        href: '/sign-up',
        attr: { class: 'link' },
        events: {
          click: async () => {
            router.go('/sign-up');
          },
        },
      }),
      attr: { class: 'section-wrap login' },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
