import template from './template.hbs?raw';
import Component from '../../services/Component';
import Title from '../../components/title';
import Input from '../../components/input';
import Form from '../../components/form';
import Button from '../../components/button';
import Link from '../../components/link';
import Avatar from '../../components/avatar';
import * as REGEXP from '../../constants/consts-regexp';
import { inputValidate, comparePasswords } from '../../utils/inputValidate';
import router from '../../services/Router/Router';
import { PasswordRequestModel } from '../../models/UserModel';
import { changeUserPassword } from '../../controllers/user';

import './passwordEdit.scss';


const avatar = new Avatar({});

const formFields = [
  new Input({
    label: 'Старый пароль',
    type: 'password',
    name: 'oldPassword',
    placeholder: 'старый пароль',
    attr: { class: 'form-data-row password-row' },
  }),
  new Input({
    label: 'Новый пароль',
    type: 'password',
    name: 'newPassword',
    placeholder: 'новый пароль',
    attr: { class: 'form-data-row password-row' },
  }),
  new Input({
    label: 'Повторите новый пароль',
    type: 'password',
    name: 'newPasswordRepeat',
    placeholder: 'пароль ещё раз',
    attr: { class: 'form-data-row password-row' },
  }),
];

export default class PasswordEditPage extends Component {
  constructor() {
    super('section', {
      button: new Button({
        attr: {
          type: 'button',
          class: 'button-return',
        },
        events: {
          click: () => {
            router.go(`/settings`);
          },
        },
      }),
      avatar: avatar,
      title: new Title({
        text: '',
      }),
      form: new Form({
        formFields,
        button: new Button({
          text: 'Сохранить',
          attr: { type: 'submit', class: 'button-apply' },
        }),
        attr: { class: 'form password-edit-form' },
        events: {
          blur: (evt) => {
            const input = evt.target as HTMLInputElement;
            if (input.name === 'oldPassword') {
              inputValidate(input.value, REGEXP.PASSWORD_REGEXP, input);
            } else if (input.name === 'newPassword') {
              inputValidate(input.value, REGEXP.PASSWORD_REGEXP, input);
            } else if (input.name === 'newPasswordRepeat') {
              inputValidate(input.value, REGEXP.PASSWORD_REGEXP, input);
            }
          },
          submit: async (evt) => {
            evt.preventDefault();

            let result: boolean = true;
            const output: Record<string, string> = {};
            const inputs = (evt.target as HTMLElement)?.querySelectorAll(
              'input'
            );

            inputs.forEach((input) => {
              switch (input.name) {
                case 'oldPassword':
                  if (
                    input.value !== '' &&
                    inputValidate(input.value, REGEXP.PASSWORD_REGEXP, input)
                  ) {
                    break;
                  }
                  result = false;
                  break;
                case 'newPassword':
                  if (
                    input.value !== '' &&
                    inputValidate(input.value, REGEXP.PASSWORD_REGEXP, input)
                  ) {
                    break;
                  }
                  result = false;
                  break;

                case 'newPasswordRepeat':
                  if (
                    input.value !== '' &&
                    inputValidate(input.value, REGEXP.PASSWORD_REGEXP, input) &&
                    comparePasswords(
                      (
                        document.querySelector(
                          `[name="newPassword"]`
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
                if (input.name !== 'newPasswordRepeat') {
                  output[`${input.name}`] = input.value;
                }
              });

              try {
                await changeUserPassword(output as PasswordRequestModel);
                alert('Пароль успешно изменен!');
              } catch (error) {
                alert('Не удалось изменить пароль. Что-то пошло не так');
                console.error(error);
              }
            }
            return;
          },
        },
      }),

      link: new Link({
        text: 'Вы ещё не зарегистрированы?',
        attr: { href: '/registration', class: 'link' },
      }),
      attr: { class: 'profile-wrap profile-edit-wrap' },
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
