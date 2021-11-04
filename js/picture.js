import { adForm } from './ad-form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = adForm.querySelector('.ad-form__upload input[type=file]');
const previewContainer = adForm.querySelector('.ad-form__photo');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    let preview = previewContainer.querySelector('img');
    if (preview) {
      preview.src = URL.createObjectURL(file);
    } else {
      preview =  document.createElement('img');
      preview.src = URL.createObjectURL(file);
      preview.style.width = '70px';
      preview.style.height = '70px';
      previewContainer.appendChild(preview);
    }
  }
});

