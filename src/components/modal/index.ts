import template from './template.hbs?raw';
import Component, { ComponentProps } from '../../services/Component';
import './modal.scss';

export default class Modal extends Component {
  constructor(props: ComponentProps) {
    super('div', {
      ...props,
      attr: {
        class: 'modal-wrap',
      },
    });
  }

  addEvents() {
    this.element
      .querySelector('.bg')
      ?.addEventListener('click', () => this.hide());
  }

  show() {
    this.element.classList.add('active-modal');
  }

  hide() {
    this.element.classList.remove('active-modal');
  }

  render() {
    return this.compile(template, this.props);
  }
}
