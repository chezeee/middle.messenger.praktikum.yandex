import template from './template.hbs?raw';
import Component from '../../../services/Component';
import Title from '../../../components/title';
import Input from '../../../components/input';
import Form from '../../../components/form';
import Button from '../../../components/button';
import Link from '../../../components/link';
import * as REGEXP from '../../../constants/consts-regexp';
import { inputValidate, comparePasswords } from '../../../utils/inputValidate';

import './registration.scss';

const formFields = [
  new Input({
    label: 'Почта',
    type: 'email',
    name: 'email',
    placeholder: 'почту',
    attr: { class: 'form-input-wrap' },
    events: {
      change: (evt) => {
        const input = evt.target as HTMLInputElement;
        if (input.name === 'email') {
          inputValidate(input.value, REGEXP.EMAIL_REGEXP, input);
        }
      },
    },
  }),
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
          inputValidate(input.value, REGEXP.LOGIN_REGEXP, input);
        }
      },
    },
  }),
  new Input({
    label: 'Имя',
    type: 'text',
    name: 'first_name',
    placeholder: 'имя',
    attr: { class: 'form-input-wrap' },
    events: {
      change: (evt) => {
        const input = evt.target as HTMLInputElement;
        if (input.name === 'first_name') {
          inputValidate(input.value, REGEXP.NAME_REGEXP, input);
        }
      },
    },
  }),
  new Input({
    label: 'Фамилия',
    type: 'text',
    name: 'second_name',
    placeholder: 'фамилию',
    attr: { class: 'form-input-wrap' },
    events: {
      change: (evt) => {
        const input = evt.target as HTMLInputElement;
        if (input.name === 'second_name') {
          inputValidate(input.value, REGEXP.NAME_REGEXP, input);
        }
      },
    },
  }),
  new Input({
    label: 'Телефон',
    type: 'text',
    name: 'phone',
    placeholder: 'телефон',
    attr: { class: 'form-input-wrap' },
    events: {
      change: (evt) => {
        const input = evt.target as HTMLInputElement;
        if (input.name === 'phone') {
          inputValidate(input.value, REGEXP.PHONE_REGEXP, input);
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
  new Input({
    label: 'Пароль (ещё раз)',
    type: 'text',
    name: 'password_repeat',
    placeholder: 'пароль ещё раз',
    attr: { class: 'form-input-wrap' },
    events: {
      change: (evt) => {
        const input = evt.target as HTMLInputElement;
        if (input.name === 'password_repeat') {
          inputValidate(input.value, REGEXP.PASSWORD_REGEXP, input);
        }
      },
    },
  }),
];

class Registration extends Component {
  render() {
    return this.compile(template, this.props);
  }
}

export const RegistrationPage = new Registration('section', {
  title: new Title({
    text: 'Регистрация',
  }),
  form: new Form({
    formFields,
    button: new Button({
      text: 'Создать аккаунт',
      attr: { type: 'submit', class: 'button-apply' },
    }),
    attr: { class: 'auth-form-reg' },
    events: {
      submit: (evt) => {
        evt.preventDefault();

        let result: boolean = true;
        let output: Record<string, string> = {};
        const inputs = (evt.target as HTMLElement)?.querySelectorAll('input');

        inputs.forEach((input) => {
          switch (input.name) {
            case 'email':
              if (
                input.value !== '' &&
                inputValidate(input.value, REGEXP.EMAIL_REGEXP, input)
              ) {
                break;
              }
              result = false;
              break;
            case 'login':
              if (
                input.value !== '' &&
                inputValidate(input.value, REGEXP.LOGIN_REGEXP, input)
              ) {
                break;
              }
              result = false;
              break;
            case 'first_name':
              if (
                input.value !== '' &&
                inputValidate(input.value, REGEXP.NAME_REGEXP, input)
              ) {
                break;
              }
              result = false;
              break;
            case 'second_name':
              if (
                input.value !== '' &&
                inputValidate(input.value, REGEXP.NAME_REGEXP, input)
              ) {
                break;
              }
              result = false;
              break;
            case 'phone':
              if (
                input.value !== '' &&
                inputValidate(input.value, REGEXP.PHONE_REGEXP, input)
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
              break;
            case 'password_repeat':
              if (
                input.value !== '' &&
                inputValidate(input.value, REGEXP.PASSWORD_REGEXP, input) &&
                comparePasswords(
                  (
                    document.querySelector(
                      `[name="password"]`
                    ) as HTMLInputElement
                  )?.value,
                  input.value,
                  input
                )
              ) {
                break;
              }
              result = false;
              break;
          }
        });

        if (result) {
          inputs.forEach((input) => {
            output[`${input.name}`] = input.value;
          });

          console.log('Registration User data: ', output);
        }
        return;
      },
    },
  }),

  link: new Link({
    text: 'Войти',
    href: '/login',
    attr: { class: 'link' },
  }),
  attr: { class: 'section-wrap registration' },
});
