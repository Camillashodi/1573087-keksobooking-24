import { disactivateForm } from './form-control.js';
import { mapForm } from './map-form.js';
import { map, mainPinMarker } from './map.js';
//import { resetAllSettings } from './reset-all-settings.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const RECEIVING_HOST = 'https://24.javascript.pages.academy/keksobooking';
const adForm = document.querySelector('.ad-form');
const adFormAddress = adForm.querySelector('#address');
const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');

function checkRoomCapacity (rooms, capacity) {
  if ((+rooms) === 100 && (+capacity) !== 0) {
    return 'Такое количество комнат не для гостей';
  }
  if ((+rooms) !== 100 && (+capacity) === 0) {
    return `Выберите количество гостей для ${rooms} комнат${(+rooms[rooms.length - 1]) === 1 ? 'ы' : ''}.`;
  }
  if (rooms < capacity) {
    return `Такое количество комнат позволяет разместить не более ${rooms} гост${(+rooms[rooms.length - 1]) === 1 ? 'я' : 'ей'}`;
  }
  return '';
}

function resetAllSettings() {
  adForm.reset();
  mapForm.reset();

  mainPinMarker.setLatLng({
    lat: 35.68034,
    lng: 139.76902,
  });

  map.setView({
    lat: 35.68034,
    lng: 139.76902,
  }, 14);

  adFormAddress.value = '35.68034, 139.76902';
}

function createAdFormPopup (popupTemplate) {
  const adFormPopup = popupTemplate.cloneNode(true);
  const popupButton = adFormPopup.querySelector('button');
  function removeElement () {
    adFormPopup.removeEventListener('click', onPopupClick);
    document.removeEventListener('keydown', onEscKeyDown);
    if (popupButton) {
      popupButton.removeEventListener('click', onPopupButtonClick);
    }
    adFormPopup.remove();
  }

  function onPopupClick () {
    removeElement();
  }

  function onPopupButtonClick () {
    removeElement();
  }

  function onEscKeyDown (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeElement();
    }
  }

  adFormPopup.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onEscKeyDown);

  if (popupButton) {
    popupButton.addEventListener('click', onPopupButtonClick);
  }

  document.body.appendChild(adFormPopup);
}

disactivateForm(adForm);

const adFormTitleInput = adForm.querySelector('#title');

function checkTitleValidity (titleInput) {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH && valueLength !== 0) {
    titleInput.setCustomValidity(`Не меньше ${MIN_TITLE_LENGTH} символов. Сейчас: ${valueLength}.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Не больше ${MAX_TITLE_LENGTH} символов. Сейчас: ${valueLength}.`);
  } else if (valueLength === 0) {
    titleInput.setCustomValidity('Заголовок обязателен в объявлении.');
  } else {
    titleInput.setCustomValidity('');
  }
}

adFormTitleInput.addEventListener('input', () => {
  adFormTitleInput.style.borderColor = '';
  checkTitleValidity(adFormTitleInput);
  adFormTitleInput.reportValidity();
});

adFormTitleInput.addEventListener('invalid', () => {
  checkTitleValidity(adFormTitleInput);
});

const adFormPriceInput = adForm.querySelector('#price');
const typeSelect = adForm.querySelector('#type');
const typeToMinPriceRatio = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

adFormPriceInput.setAttribute('min', typeToMinPriceRatio[typeSelect.value]);
adFormPriceInput.setAttribute('placeholder', typeToMinPriceRatio[typeSelect.value]);

typeSelect.addEventListener('change', () => {
  adFormPriceInput.setAttribute('placeholder', typeToMinPriceRatio[typeSelect.value]);
  adFormPriceInput.setAttribute('min', typeToMinPriceRatio[typeSelect.value]);
  if (adFormPriceInput.value) {
    adFormPriceInput.reportValidity();
  }
});

adFormPriceInput.addEventListener('input', () => {
  const valueInput = adFormPriceInput.value;
  adFormPriceInput.style.borderColor = '';

  if (valueInput > MAX_PRICE) {
    adFormPriceInput.setCustomValidity(`Цена за ночь не больше ${MAX_PRICE} руб.`);
  } else if (!valueInput) {
    adFormPriceInput.setCustomValidity('Цена обязательна к заполнению');
  } else {
    adFormPriceInput.setCustomValidity('');
  }

  adFormPriceInput.reportValidity();
});

adFormPriceInput.addEventListener('invalid', () => {
  if (adFormPriceInput.validity.rangeOverflow) {
    adFormPriceInput.setCustomValidity(`Цена за ночь не больше ${MAX_PRICE} руб.`);
  } else if (adFormPriceInput.validity.valueMissing) {
    adFormPriceInput.setCustomValidity('Цена обязательна к заполнению');
  } else {
    adFormPriceInput.setCustomValidity('');
  }
});

function synchronizeElements (changedElement, elementForSync) {
  elementForSync.value = changedElement.value;
}

const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');

timeinSelect.addEventListener('change', () => {
  synchronizeElements(timeinSelect, timeoutSelect);
});

timeoutSelect.addEventListener('change', () => {
  synchronizeElements(timeoutSelect, timeinSelect);
});

const roomNumberSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');

roomNumberSelect.addEventListener('change', () => {
  capacitySelect.style.borderColor = '';
  capacitySelect.setCustomValidity(checkRoomCapacity(roomNumberSelect.value, capacitySelect.value));

  capacitySelect.reportValidity();
});

capacitySelect.addEventListener('change', () => {
  capacitySelect.style.borderColor = '';
  capacitySelect.setCustomValidity(checkRoomCapacity(roomNumberSelect.value, capacitySelect.value));

  capacitySelect.reportValidity();
});

const adFormButtonSubmit = adForm.querySelector('.ad-form__submit');
adFormButtonSubmit.addEventListener('click', () => {
  if (!capacitySelect.reportValidity()) {
    capacitySelect.style.borderColor = 'red';
  }
  if (!adFormPriceInput.reportValidity()) {
    adFormPriceInput.style.borderColor = 'red';
  }
  if (!adFormTitleInput.reportValidity()) {
    adFormTitleInput.style.borderColor = 'red';
  }
});

adForm.addEventListener('submit', (evt) => {
  const capacityCheck = checkRoomCapacity(roomNumberSelect.value, capacitySelect.value);
  evt.preventDefault();

  if (capacityCheck.length !== 0) {
    capacitySelect.setCustomValidity(capacityCheck);
  } else {
    capacitySelect.setCustomValidity('');
    const formData = new FormData(adForm);

    fetch(
      RECEIVING_HOST,
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          createAdFormPopup(successPopupTemplate);
          resetAllSettings();
          return;
        }

        throw new Error(`${response.status} ${response.statusText}`);
      })
      .catch(() => {
        createAdFormPopup(errorPopupTemplate);
      });
  }
});

const adFormReset = adForm.querySelector('.ad-form__reset');

adFormReset.addEventListener('click', (evt) => {
  capacitySelect.setCustomValidity('');
  evt.preventDefault();
  resetAllSettings();
  capacitySelect.style.borderColor = '';
  adFormPriceInput.style.borderColor = '';
  adFormTitleInput.style.borderColor = '';
});

export { adForm, adFormAddress };
