import template from './template.hbs?raw';
import Component from '../../../services/Component';
import Title from '../../../components/title';
import Input from '../../../components/input';
import Form from '../../../components/form';
import Button from '../../../components/button';
import Link from '../../../components/link';
import * as REGEXP from '../../../constants/consts-regexp';
import { inputValidate } from '../../../utils/inputValidate';
import { getUserData, logout, signIn } from '../../../controllers/auth';
import { SignInRequestModel } from '../../../models/AuthModel';

import '../auth.scss';
import './login.scss';
import router from '../../../services/Router/Router';
import { setUserState } from '../../../services/Store/Actions';
import { store } from '../../../services/Store/Store';

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

                console.log('STATE: ', store.getState());

                router.go('/messenger');
              } catch (error) {
                console.error('Error: ', error.message);
              }
            }
            // try {
            //   await signIn(output);
            //   const user = await getUserData();
            //   console.log('User data: ', user);
            //   // setCurrentUser(user);

            //   router.go('/chat');
            // } catch (error) {
            //   console.error("Error: ", error.message);
            //   // alert(error.reason);
            // }
          },
        },
      }),

      link: new Link({
        text: 'Вы ещё не зарегистрированы?',
        href: '/registration',
        attr: { class: 'link' },
      }),
      attr: { class: 'section-wrap login' },
    });
  }

  render() {
    logout();

    return this.compile(template, this.props);
  }
}
