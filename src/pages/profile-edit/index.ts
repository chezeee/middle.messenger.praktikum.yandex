import template from './template.hbs?raw';
import Component from '../../services/Component';
import Title from '../../components/title';
import Input from '../../components/input';
import Form from '../../components/form';
import Button from '../../components/buttons/button';
import Link from '../../components/link';
import './profileEdit.scss';

const formFields = [
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
];

class ProfileEdit extends Component {
  render() {
    return this.compile(template, this.props);
  }
}

export const ProfileEditPage = new ProfileEdit('section', {
  button: new Button({
    attr: {
      type: 'button',
      class: 'buttonReturn',
      onclick: "window.location='/profile'",
    },
  }),
  title: new Title({
    text: '',
  }),
  form: new Form({
    formFields,
    button: new Button({
      text: 'Сохранить',
      attr: { type: 'submit', class: 'buttonApply' },
    }),
    attr: { class: 'form profile-edit-form' },
  }),

  link: new Link({
    text: 'Вы ещё не зарегистрированы?',
    attr: { href: '/registration', class: 'link' },
  }),
  attr: { class: 'profile-wrap profile-edit-wrap' },
});
