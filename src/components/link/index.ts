import Component, { ComponentProps } from '../../services/Component';
import template from './template.hbs?raw';
import './link.scss';

export default class Link extends Component {
  constructor(props: ComponentProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
