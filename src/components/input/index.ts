import Component, { ComponentProps } from '../../services/Component';
import template from './template.hbs?raw';

export default class Input extends Component {
  constructor(props: ComponentProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
