import Component, { ComponentProps } from '../../services/Component';
import template from './template.hbs?raw';
import './chatList.scss';

export default class ChatList extends Component {
  constructor(props: ComponentProps) {
    super('div', { ...props, attr: { class: 'chat-list-wrap' } });
  }

  render() {
    return this.compile(template, this.props);
  }
}
