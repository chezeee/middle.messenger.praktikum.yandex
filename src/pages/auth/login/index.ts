import template from './template.hbs?raw';
import Component from '../../../services/Component';
import Title from '../../../components/title';
import Input from '../../../components/input';
import Form from '../../../components/form';
import Button from '../../../components/button';
import Link from '../../../components/link';
import * as REGEXP from '../../../constants/consts-regexp';
import {inputValidate} from '../../../utils/inputValidate';

import '../auth.scss';
import './login.scss';

const formFields = [
  new Input({
    label: 'Логин',
    type: 'text',
    name: 'login',
    placeholder: 'логин',
    attr: { class: 'form-input-wrap' },
    events: {
      change: (evt) => {
        const input = evt.target as HTMLInputElement;
        if (input.name === 'login') {
          console.log(
            `Validate ${input.name} value: `,
            inputValidate(input.value, REGEXP.LOGIN_REGEXP, input)
          );
        }
      },
    },
  }),
  new Input({
    label: 'Пароль',
    type: 'text',
    name: 'password',
    placeholder: 'пароль',
    attr: { class: 'form-input-wrap' },
    events: {
      change: (evt) => {
        const input = evt.target as HTMLInputElement;
        if (input.name === 'password') {
          inputValidate(input.value, REGEXP.PASSWORD_REGEXP, input);
        }
      },
    },
  }),
];

class Login extends Component {
  render() {
    return this.compile(template, this.props);
  }
}

export const LoginPage = new Login('section', {
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
      submit: (evt) => {
        evt.preventDefault();

        let result: boolean = true;
        let output: Record<string, string> = {};
        const inputs = (evt.target as HTMLElement)?.querySelectorAll('input');

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

          console.log('Login User data: ', output);
        }
        return;
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
