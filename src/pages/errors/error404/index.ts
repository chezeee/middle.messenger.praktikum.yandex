import template from './template.hbs?raw';
import Component from '../../../services/Component';
import Link from '../../../components/link';
import Error from '../../../components/error';

class ErrorPage extends Component {
  render() {
    return this.compile(template, this.props);
  }
}

export const Error404Page = new ErrorPage('section', {
  error: new Error({
    title: 'Ошибка 404',
    message: 'Не туда попали',
    link: new Link({
      text: 'Назад к чатам',
      href: '/chat',
      attr: { class: 'link' },
    }),
  }),
});
