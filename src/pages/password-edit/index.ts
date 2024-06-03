import template from './template.hbs?raw';
import Component from '../../services/Component';
import Title from '../../components/title';
import Input from '../../components/input';
import Form from '../../components/form';
import Button from '../../components/button';
import Link from '../../components/link';
import Avatar from '../../components/avatar';
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

class PasswordEdit extends Component {
  render() {
    return this.compile(template, this.props);
  }
}

export const PasswordEditPage = new PasswordEdit('section', {
  button: new Button({
    attr: {
      type: 'button',
      class: 'button-return',
      onclick: "window.location='/profile'",
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
    
  }),

  link: new Link({
    text: 'Вы ещё не зарегистрированы?',
    attr: { href: '/registration', class: 'link' },
  }),
  attr: { class: 'profile-wrap profile-edit-wrap' },
});
