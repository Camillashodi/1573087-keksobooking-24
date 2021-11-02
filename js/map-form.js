import { disactivateForm } from './form-control.js';

const mapForm = document.querySelector('.map__filters');
const mapFormSelects = mapForm.querySelectorAll('.map__filter');
const mapFormCheckboxes = mapForm.querySelectorAll('.map__checkbox');

disactivateForm(mapForm);

export { mapForm, mapFormSelects, mapFormCheckboxes };
