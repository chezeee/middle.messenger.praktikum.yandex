import Component, { ComponentProps } from '../../services/Component';
import template from './template.hbs?raw';
import './form.scss';

export default class Button extends Component {
  constructor(props: ComponentProps) {
    super('form', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
