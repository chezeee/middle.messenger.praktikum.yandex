import Component, { ComponentProps } from '../../../services/Component';
import template from './template.hbs?raw';
import './button.scss';

export default class Button extends Component {
  constructor(props: ComponentProps) {
    super('button', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
