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

import './profile.scss';
import { store } from '../../services/Store/Store';
import { Connect } from '../../services/Store/Connect';
import { UserModel } from '../../models/UserModel';

const chatId = store.getStateKey('currentChatId');
const user = store.getStateKey('user') as UserModel;
const userId = user.id as number;

const avatar = new Avatar({});

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
        router.go(`/settings/profile-edit?user_ID=${userId}`);
      },
    },
    attr: { class: 'profile-card-options__data-row' },
  }),
  new Link({
    text: 'Изменить пароль',
    events: {
      click: () => {
        router.go(`/settings/password-edit?user_ID=${userId}`);
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
          router.go('/');
        } catch (e) {
          console.error(e);
        }
      },
    },
  }),
];

class ProfilePage extends Component {
  constructor() {
    super('section', {
      button: new Button({
        attr: {
          type: 'button',
          class: 'button-return',
        },
        events: {
          click: () => {
            router.go(`/messenger?id=${chatId}`);
          },
        },
      }),
      avatar: avatar,
      title: new Title({
        text: `${user.first_name} ${user.second_name}`,
      }),
      form: new Form({
        formFields: formConnect,
        button: '',
        attr: { class: 'form profile-form' },
      }),

      profileOptions,
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}

export default ProfilePage;
