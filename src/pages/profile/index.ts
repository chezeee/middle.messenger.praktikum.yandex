import template from './template.hbs?raw';
import Component from '../../services/Component';
import Avatar from '../../components/avatar';
import Title from '../../components/title';
import Input from '../../components/input';
import Form from '../../components/form';
import Button from '../../components/button';
import Link from '../../components/link';
import './profile.scss';

const avatar = new Avatar({});

const formFields = [
  new Input({
    label: 'Почта',
    type: 'email',
    name: 'email',
    value: 'chezeee@gmail.com',
    isReadOnly: true,
    attr: { class: 'form-data-row profile-row' },
  }),
  new Input({
    label: 'Логин',
    type: 'text',
    name: 'login',
    value: 'Chezeee',
    isReadOnly: true,
    attr: { class: 'form-data-row profile-row' },
  }),
  new Input({
    label: 'Имя',
    type: 'text',
    name: 'first_name',
    value: 'Илья',
    isReadOnly: true,
    attr: { class: 'form-data-row profile-row' },
  }),
  new Input({
    label: 'Фамилия',
    type: 'text',
    name: 'second_name',
    placeholder: 'фамилию',
    value: 'Ялымов',
    isReadOnly: true,
    attr: { class: 'form-data-row profile-row' },
  }),
  new Input({
    label: 'Имя в чате',
    type: 'text',
    name: 'display_name',
    placeholder: 'имя',
    value: 'Chezeee',
    isReadOnly: true,
    attr: { class: 'form-data-row profile-row' },
  }),
  new Input({
    label: 'Телефон',
    type: 'text',
    name: 'phone',
    placeholder: 'новый телефон',
    value: '+78889997766',
    isReadOnly: true,
    attr: { class: 'form-data-row profile-row' },
  }),
];

const profileOptions = [
  new Link({
    text: 'Изменить данные',
    href: '/profile-edit',
    attr: { class: 'profile-card-options__data-row' },
  }),
  new Link({
    text: 'Изменить пароль',
    href: '/password-edit',
    attr: { class: 'profile-card-options__data-row' },
  }),
  new Link({
    text: 'Выйти',
    href: '/login',
    attr: { class: 'profile-card-options__data-row' },
  }),
];

export default class ProfilePage extends Component {
  constructor() {
    super('section', {
      button: new Button({
        attr: {
          type: 'button',
          class: 'button-return',
          onclick: "window.location='/chat'",
        },
      }),
      avatar: avatar,
      title: new Title({
        text: 'Илья Ялымов',
      }),
      form: new Form({
        formFields,
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
