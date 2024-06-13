import template from './template.hbs?raw';
import Component, { ComponentProps } from '../../services/Component';
import './avatar.scss';

export default class Avatar extends Component {
  constructor(props: ComponentProps) {
    super('div', { ...props, attr: { class: 'avatar' } });
  }

  render() {
    return this.compile(template, this.props);
  }
}
