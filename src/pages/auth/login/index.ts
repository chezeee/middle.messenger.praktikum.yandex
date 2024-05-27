import template from './template.hbs?raw';
import Component from '../../../services/Component';
import Title from '../../../components/title';
import Input from '../../../components/input';
import Form from '../../../components/form';
import Button from '../../../components/buttons/button';
import Link from '../../../components/link';
import './login.scss';

const formFields = [
  new Input({
    label: 'Логин',
    type: 'text',
    name: 'login',
    placeholder: 'логин',
  }),
  new Input({
    label: 'Пароль',
    type: 'text',
    name: 'password',
    placeholder: 'пароль',
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
  }),

  link: new Link({
    text: 'Вы ещё не зарегистрированы?',
    attr: { href: '/registration', class: 'link' },
  }),
  attr: { class: 'login-wrap' },
});
