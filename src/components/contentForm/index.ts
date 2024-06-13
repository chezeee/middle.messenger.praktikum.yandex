import Component, { ComponentProps } from '../../services/Component';
import template from './template.hbs?raw';
import './contentForm.scss';

export default class ContentForm extends Component {
  constructor(props: ComponentProps) {
    super('section', {
      ...props,
      attr: { class: 'content-form' },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
