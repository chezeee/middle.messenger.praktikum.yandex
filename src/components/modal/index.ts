import template from './template.hbs?raw';
import Component, { ComponentProps } from '../../services/Component';
import './modal.scss';

export default class Modal extends Component {
  constructor(props: ComponentProps) {
    super('div', {
      ...props,
      attr: {
        class: 'modal',
      },
      events: {
        // click: (evt: Event) => {
        //   if (evt.currentTarget === this.element.querySelector('.modal')) {
        //     this.hide();
        //   }
        // },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
