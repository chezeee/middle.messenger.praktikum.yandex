import template from './template.hbs?raw';
import Component from '../../services/Component';
import Avatar from '../../components/avatar';
import Title from '../../components/title';
import Input from '../../components/input';
import Form from '../../components/form';
import Button from '../../components/button';
import Link from '../../components/link';
import router from '../../services/Router/Router';
import { logout } from '../../controllers/auth';
import { store } from '../../services/Store/Store';
import { Connect } from '../../services/Store/Connect';
import changeAvatarModal from '../components/ChangeAvatarModal';
import { RESOURCES } from '../../api/base-api';

import './profile.scss';

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
        value: state?.user?.email,
        isReadOnly: true,
        attr: { class: 'form-data-row profile-row' },
      }),
      new Input({
        label: 'Логин',
        type: 'text',
        name: 'login',
        value: state?.user?.login,
        isReadOnly: true,
        attr: { class: 'form-data-row profile-row' },
      }),
      new Input({
        label: 'Имя',
        type: 'text',
        name: 'first_name',
        value: state?.user?.first_name,
        isReadOnly: true,
        attr: { class: 'form-data-row profile-row' },
      }),
      new Input({
        label: 'Фамилия',
        type: 'text',
        name: 'second_name',
        placeholder: 'фамилию',
        value: state?.user?.second_name,
        isReadOnly: true,
        attr: { class: 'form-data-row profile-row' },
      }),
      new Input({
        label: 'Имя в чате',
        type: 'text',
        name: 'display_name',
        placeholder: 'имя',
        value: state?.user?.display_name,
        isReadOnly: true,
        attr: { class: 'form-data-row profile-row' },
      }),
      new Input({
        label: 'Телефон',
        type: 'text',
        name: 'phone',
        placeholder: 'новый телефон',
        value: state?.user?.phone,
        isReadOnly: true,
        attr: { class: 'form-data-row profile-row' },
      }),
    ],
    attr: { class: 'form profile-form' },
  };
});

const formConnect = new FormConnect();

const profileOptions = [
  new Link({
    text: 'Изменить данные',
    events: {
      click: () => {
        router.go(`/settings/profile-edit`);
      },
    },
    attr: { class: 'profile-card-options__data-row' },
  }),
  new Link({
    text: 'Изменить пароль',
    events: {
      click: () => {
        router.go(`/settings/password-edit`);
      },
    },
    attr: { class: 'profile-card-options__data-row' },
  }),
  new Link({
    text: 'Выйти',
    attr: { class: 'profile-card-options__data-row' },
    events: {
      click: async () => {
        try {
          await logout();

          store.removeState();
          window.location.replace('');
          router.go('/');
        } catch (error) {
          console.error(error);
        }
      },
    },
  }),
];

const TitleConnect = Connect(Title as never, (state) => {
  return {
    text: `${state?.user?.first_name} ${state?.user?.second_name}`,
  };
});

const titleConnect = new TitleConnect();

export default class ProfilePage extends Component {
  constructor() {
    super('section', {
      button: new Button({
        attr: {
          type: 'button',
          class: 'button-return',
        },
        events: {
          click: () => {
            router.go(`/messenger`);
          },
        },
      }),
      avatar: avatarConnect,
      title: titleConnect,
      form: new Form({
        formFields: formConnect,
        button: '',
        attr: { class: 'form profile-form' },
      }),
      modals: modals,
      profileOptions,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
