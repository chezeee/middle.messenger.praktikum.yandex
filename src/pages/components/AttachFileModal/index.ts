import Button from '../../../components/button';
import Form from '../../../components/form';
import InputFile from '../../../components/InputFile';
import Modal from '../../../components/modal';
import Title from '../../../components/title';
import { uploadResource } from '../../../controllers/resources';
import { ResourcesModel } from '../../../models/ResourcesModel';
import WSTransport from '../../../utils/WSTransport';

const webSocket = new WSTransport();


const title = new Title({ text: 'Отправить изображение' });

const inputField = new InputFile({
  name: 'attach_file',
  isRequired: true,
  attr: { class: 'form-input-file-wrap' },
  events: {
    change: (evt: Event) => {
      const files = (evt?.target as HTMLInputElement)?.files;
      title.setProps({ text: 'Файл загружен' });
      attachFileForm.setProps({ file: files?.[0] });

      console.log('input change file: ', files?.[0]);
    },
  },
});

const attachFileForm = new Form({
  formFields: inputField,
  button: new Button({
    type: 'submit',
    text: 'Отправить',
    attr: { class: 'button-apply' },
  }),
  attr: { class: 'modal-form-wrap' },
  events: {
    submit: async (evt: Event) => {
      evt.preventDefault();
      const formData = new FormData();
      formData.append('resource', attachFileForm.props.file as Blob);
      try {
        const uploadFile = await uploadResource(formData);
        webSocket.sendFile((uploadFile as ResourcesModel).id);
        attachFileModal.hide();
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

const attachFileModal = new Modal({
  content: [title, attachFileForm],
});

export default attachFileModal;
