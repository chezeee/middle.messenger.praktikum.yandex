import template from './template.hbs?raw';
import Component from '../../services/Component';
import { RESOURCES } from '../../api/base-api';
import Title from '../../components/title';
import Input from '../../components/input';
import Form from '../../components/form';
import Button from '../../components/button';
import Link from '../../components/link';
import Avatar from '../../components/avatar';
import * as REGEXP from '../../constants/consts-regexp';
import { inputValidate } from '../../utils/inputValidate';
import router from '../../services/Router/Router';
import { Connect } from '../../services/Store/Connect';
import { changeUserProfile } from '../../controllers/user';
import { setUserState } from '../../services/Store/Actions';
import { getUserData } from '../../controllers/auth';
import changeAvatarModal from '../components/ChangeAvatarModal';

import './profileEdit.scss';

const AvatarConnect = Connect(Avatar as never, (state) => {
  return {
    avatar: state?.user?.avatar ? RESOURCES + state?.user?.avatar : false,
  };
});

const avatarConnect = new AvatarConnect();

const modals = [changeAvatarModal];

const FormConnect = Connect(Form as never, (state) => {
  return {
    formFields: [
      new Input({
        label: 'Почта',
        type: 'email',
        name: 'email',
        placeholder: 'новую почту',
        attr: { class: 'form-data-row' },
      }),
      new Input({
        label: 'Логин',
        type: 'text',
        name: 'login',
        placeholder: 'новый логин',
        attr: { class: 'form-data-row' },
      }),
      new Input({
        label: 'Имя',
        type: 'text',
        name: 'first_name',
        placeholder: 'имя',
        attr: { class: 'form-data-row' },
      }),
      new Input({
        label: 'Фамилия',
        type: 'text',
        name: 'second_name',
        placeholder: 'фамилию',
        attr: { class: 'form-data-row' },
      }),
      new Input({
        label: 'Имя в чате',
        type: 'text',
        name: 'display_name',
        placeholder: 'имя',
        attr: { class: 'form-data-row' },
      }),
      new Input({
        label: 'Телефон',
        type: 'text',
        name: 'phone',
        placeholder: 'новый телефон',
        attr: { class: 'form-data-row' },
      }),
    ],
    button: new Button({
      text: 'Сохранить',
      attr: { type: 'submit', class: 'button-apply' },
    }),
    attr: { class: 'form profile-edit-form' },
    events: {
      blur: (evt: Event) => {
        const input = evt.target as HTMLInputElement;
        if (input.value === '') {
          return;
        } else if (input.name === 'email') {
          inputValidate(input.value, REGEXP.EMAIL_REGEXP, input);
        } else if (input.name === 'login') {
          inputValidate(input.value, REGEXP.LOGIN_REGEXP, input);
        } else if (input.name === 'first_name') {
          inputValidate(input.value, REGEXP.NAME_REGEXP, input);
        } else if (input.name === 'second_name') {
          inputValidate(input.value, REGEXP.NAME_REGEXP, input);
        } else if (input.name === 'display_name') {
          inputValidate(input.value, REGEXP.PHONE_REGEXP, input);
        } else if (input.name === 'phone') {
          inputValidate(input.value, REGEXP.PASSWORD_REGEXP, input);
        }
      },
      submit: async (evt: Event) => {
        evt.preventDefault();

        let result: boolean = true;
        const output: Record<string, string> = {};
        const inputs = (evt.target as HTMLElement)?.querySelectorAll('input');

        inputs.forEach((input) => {
          switch (input.name) {
            case 'email':
              if (input.value === '' && state?.user?.email) {
                input.value = state?.user?.email;

                break;
              } else if (
                inputValidate(input.value, REGEXP.EMAIL_REGEXP, input)
              ) {
                break;
              }
              result = false;
              break;
            case 'login':
              if (input.value === '' && state?.user?.login) {
                input.value = state?.user?.login;
                break;
              } else if (
                inputValidate(input.value, REGEXP.LOGIN_REGEXP, input)
              ) {
                break;
              }
              result = false;
              break;
            case 'first_name':
              if (input.value === '' && state?.user?.first_name) {
                input.value = state?.user?.first_name;
                break;
              } else if (
                inputValidate(input.value, REGEXP.NAME_REGEXP, input)
              ) {
                break;
              }
              result = false;
              break;
            case 'second_name':
              if (input.value === '' && state?.user?.second_name) {
                input.value = state?.user?.second_name;
                break;
              } else if (
                inputValidate(input.value, REGEXP.NAME_REGEXP, input)
              ) {
                break;
              }
              result = false;
              break;
            case 'display_name':
              if (input.value === '' && state?.user?.display_name) {
                input.value = state?.user?.display_name;
                break;
              } else if (input.value === '') {
                break;
              } else if (
                inputValidate(input.value, REGEXP.NAME_REGEXP, input)
              ) {
                break;
              }
              result = false;
              break;
            case 'phone':
              if (input.value === '' && state?.user?.phone) {
                input.value = state?.user?.phone;
                break;
              } else if (
                inputValidate(input.value, REGEXP.PHONE_REGEXP, input)
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

          try {
            await changeUserProfile(output);
            setUserState(await getUserData());
          } catch (error) {
            alert('Не удалось обновить данные');
            console.error(error);
          }
          console.log('Edit user data: ', output);
        }
      },
    },
  };
});

const formConnect = new FormConnect();

export default class ProfileEditPage extends Component {
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
      avatar: avatarConnect,
      modal: modals,
      title: new Title({
        text: '',
      }),
      form: formConnect,
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
