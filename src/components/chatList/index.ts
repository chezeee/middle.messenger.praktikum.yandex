import Component from '../../services/Component';
import template from './template.hbs?raw';
import { ComponentWithStoreProps } from '../../services/Store/Connect';
import './chatList.scss';

export default class ChatList extends Component {
  constructor(props: ComponentWithStoreProps) {
    super('div', { ...props, attr: { class: 'chat-list-wrap' } });
  }

  render() {
    return this.compile(template, this.props);
  }
}
