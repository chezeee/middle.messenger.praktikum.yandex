import Component from '../../services/Component';
import template from './template.hbs?raw';
import { ComponentWithStoreProps } from '../../services/Store/Connect';
import './chatList.scss';

export default class ChatList extends Component {
  constructor(tagName?: string, props?: ComponentWithStoreProps) {
    super((tagName = 'div'), { ...props, attr: { class: 'chat-list-wrap' } });
  }

  render() {
    return this.compile(template, this.props);
  }
}
