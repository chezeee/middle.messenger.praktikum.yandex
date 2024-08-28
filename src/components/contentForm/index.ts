import Component from '../../services/Component';
import template from './template.hbs?raw';
import './contentForm.scss';
import { ComponentWithStoreProps } from '../../services/Store/Connect';

export default class ContentForm extends Component {
  constructor(tagName?: string, props?: ComponentWithStoreProps) {
    super((tagName = 'section'), {
      ...props,
      attr: { class: 'content-form' },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
