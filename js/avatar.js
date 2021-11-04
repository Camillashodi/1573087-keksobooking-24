import { adForm } from './ad-form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = adForm.querySelector('.ad-form__field input[type=file]');
const preview = adForm.querySelector('.ad-form-header__preview img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});

