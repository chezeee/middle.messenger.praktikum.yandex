import Component, { ComponentProps } from '../../services/Component';
import template from './template.hbs?raw';
import './title.scss';

export default class Title extends Component {
  constructor(props: ComponentProps) {
    super('h2', { ...props, attr: { class: 'title' } });
  }

  render() {
    return this.compile(template, this.props);
  }
}
