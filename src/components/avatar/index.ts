import template from './template.hbs?raw';
import Component, { ComponentProps } from '../../services/Component';
import changeAvatarModal from '../../pages/components/ChangeAvatarModal';

import './avatar.scss';

export default class Avatar extends Component {
  constructor(props: ComponentProps) {
    super('div', {
      ...props,
      attr: { class: 'avatar' },
      events: {
        click: () => {
          changeAvatarModal.show();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
