import Component, { ComponentProps } from '../../services/Component';
import template from './template.hbs?raw';
import './chatCard.scss';

export default class ChatCard extends Component {
  constructor(props: ComponentProps) {
    super('div', {
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
