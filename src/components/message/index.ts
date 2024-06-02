import Component, { ComponentProps } from '../../services/Component';
import template from './template.hbs?raw';
import './message.scss';

export default class Message extends Component {
  constructor(props: ComponentProps) {
    super('div', props);
  }

  render() {
    console.log('render ContentForm');

    return this.compile(template, this.props);
  }
}
