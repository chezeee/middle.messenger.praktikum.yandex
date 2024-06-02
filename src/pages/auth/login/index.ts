import template from './template.hbs?raw';
import Component from '../../../services/Component';
import Title from '../../../components/title';
import Input from '../../../components/input';
import Form from '../../../components/form';
import Button from '../../../components/button';
import Link from '../../../components/link';
import '../auth.scss';
import './login.scss';

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
    type: 'text',
    name: 'password',
    placeholder: 'пароль',
    attr: { class: 'form-input-wrap' },
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
      attr: { type: 'submit', class: 'buttonApply' },
    }),
    attr: { class: 'auth-form-login' },
  }),

  link: new Link({
    text: 'Вы ещё не зарегистрированы?',
    href: '/registration',
    attr: { class: 'link' },
  }),
  attr: { class: 'section-wrap login' },
});
