// export { default as Login } from './login.hbs?raw';
import template from './template.hbs?raw';
import Component from '../../../services/Component';
import Title from '../../../components/title';
import Input from '../../../components/input';
import Button from '../../../components/buttons/button';
import Link from '../../../components/link';
import '../auth.scss';
import './login.scss';

// const formFields = [new Input({})];

class Login extends Component {
  render() {
    return this.compile(template, this.props);
  }
}

export const LoginPage = new Login('section', {
  title: new Title({
    text: 'Вход',
  }),
  input: new Input({
    label: 'Логин',
    type: 'text',
    name: 'login',
    placeholder: 'логин',
  }),
  buttonApply: new Button({
    text: 'Войти',
    type: 'submit',
    attr: { class: 'buttonApply' },
  }),
  link: new Link({
    text: 'Вы ещё не зарегистрированы?',
    attr: { href: '/registration', class: 'link'},
  }),
  attr: { class: 'login-wrap' },
});
