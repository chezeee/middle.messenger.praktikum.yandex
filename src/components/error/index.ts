import Component, { ComponentProps } from '../../services/Component';
import template from './template.hbs?raw';
import './error.scss';

export default class Error extends Component {
  constructor(props: ComponentProps) {
    super('div', { ...props, attr: { class: 'error' } });
  }

  render() {
    return this.compile(template, this.props);
  }
}
