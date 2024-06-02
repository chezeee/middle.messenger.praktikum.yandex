import template from './template.hbs?raw';
import Component from '../../../services/Component';
import Title from '../../../components/title';
import Input from '../../../components/input';
import Form from '../../../components/form';
import Button from '../../../components/button';
import Link from '../../../components/link';
import './registration.scss';

const formFields = [
  new Input({
    label: 'Почта',
    type: 'email',
    name: 'email',
    placeholder: 'почту',
    attr: { class: 'form-input-wrap' },
  }),
  new Input({
    label: 'Логин',
    type: 'text',
    name: 'login',
    placeholder: 'логин',
    attr: { class: 'form-input-wrap' },
  }),
  new Input({
    label: 'Имя',
    type: 'text',
    name: 'first_name',
    placeholder: 'имя',
    attr: { class: 'form-input-wrap' },
  }),
  new Input({
    label: 'Фамилия',
    type: 'text',
    name: 'second_name',
    placeholder: 'фамилию',
    attr: { class: 'form-input-wrap' },
  }),
  new Input({
    label: 'Телефон',
    type: 'text',
    name: 'phone',
    placeholder: 'телефон',
    attr: { class: 'form-input-wrap' },
  }),
  new Input({
    label: 'Пароль',
    type: 'text',
    name: 'password',
    placeholder: 'пароль',
    attr: { class: 'form-input-wrap' },
  }),
  new Input({
    label: 'Пароль (ещё раз)',
    type: 'text',
    name: 'password_repeat',
    placeholder: 'пароль ещё раз',
    attr: { class: 'form-input-wrap' },
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
      attr: { type: 'submit', class: 'buttonApply' },
    }),
    attr: { class: 'auth-form-reg' },
  }),

  link: new Link({
    text: 'Войти',
    href: '/login',
    attr: { class: 'link' },
  }),
  attr: { class: 'section-wrap registration' },
});
