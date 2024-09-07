import Button from '../../../components/button';
import Form from '../../../components/form';
import InputFile from '../../../components/InputFile';
import Modal from '../../../components/modal';
import Title from '../../../components/title';
import { changeUserAvatar } from '../../../controllers/user';
import { setUserState } from '../../../services/Store/Actions';

const title = new Title({ text: 'Сменить аватар' });

const inputField = new InputFile({
  name: 'change_avatar',
  isRequired: true,
  attr: { class: 'form-input-file-wrap' },
  events: {
    change: (evt: Event) => {
      const files = (evt?.target as HTMLInputElement)?.files;
      title.setProps({ text: 'Файл загружен' });
      changeAvatarForm.setProps({ file: files?.[0] });

      console.log('input change file: ', files?.[0]);
    },
  },
});

const changeAvatarForm = new Form({
  formFields: inputField,
  button: new Button({
    type: 'submit',
    text: 'Сохранить',
    attr: { class: 'button-apply' },
  }),
  attr: { class: 'modal-form-wrap' },
  events: {
    submit: async (evt: Event) => {
      evt.preventDefault();
      const formData = new FormData();
      formData.append('avatar', changeAvatarForm.props.file as Blob);

      try {
        const user = await changeUserAvatar(formData);
        setUserState(user);
        changeAvatarModal.hide();
      } catch (error) {
        title.setProps({
          text: 'Ошибка, попробуйте ещё раз',
          attr: { class: 'error-title' },
        });
        console.error(error);
      }
    },
  },
});

const changeAvatarModal = new Modal({
  content: [title, changeAvatarForm],
});

export default changeAvatarModal;
