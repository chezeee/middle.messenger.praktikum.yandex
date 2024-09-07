import Component, { ComponentProps } from '../../services/Component';
import template from './template.hbs?raw';

export default class InputFile extends Component {
  constructor(props: ComponentProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
