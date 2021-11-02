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
    adFormPopup.removeEventListener('click', removeElement);
    document.removeEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        removeElement();
      }
    });
    if (popupButton) {
      popupButton.removeEventListener('click', removeElement);
    }
    adFormPopup.remove();
  }

  adFormPopup.addEventListener('click', removeElement);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeElement();
    }
  });

  if (popupButton) {
    popupButton.addEventListener('click', removeElement);
  }

  document.body.appendChild(adFormPopup);
}

disactivateForm(adForm);

const adFormTitleInput = adForm.querySelector('#title');

adFormTitleInput.addEventListener('input', () => {
  const valueLength = adFormTitleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH && valueLength !== 0) {
    adFormTitleInput.setCustomValidity(`Не меньше ${MIN_TITLE_LENGTH} символов. Сейчас: ${valueLength}.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adFormTitleInput.setCustomValidity(`Не больше ${MAX_TITLE_LENGTH} символов. Сейчас: ${valueLength}.`);
  } else if (valueLength === 0) {
    adFormTitleInput.setCustomValidity('Заголовок обязателен в объявлении.');
  } else {
    adFormTitleInput.setCustomValidity('');
  }

  adFormTitleInput.reportValidity();
});

adFormTitleInput.addEventListener('invalid', () => {
  if (adFormTitleInput.validity.tooShort) {
    adFormTitleInput.setCustomValidity(`Не меньше ${MIN_TITLE_LENGTH} символов. Сейчас: ${adFormTitleInput.value.length}.`);
  } else if (adFormTitleInput.validity.tooLong) {
    adFormTitleInput.setCustomValidity(`Не больше ${MAX_TITLE_LENGTH} символов. Сейчас: ${adFormTitleInput.value.length}.`);
  } else if (adFormTitleInput.validity.valueMissing) {
    adFormTitleInput.setCustomValidity('Заголовок обязателен в объявлении.');
  } else {
    adFormTitleInput.setCustomValidity('');
  }
});

const adFormPriceInput = adForm.querySelector('#price');

adFormPriceInput.addEventListener('input', () => {
  const valueInput = adFormPriceInput.value;

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

const roomNumberSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');
capacitySelect.value = 1;

roomNumberSelect.addEventListener('change', () => {
  capacitySelect.setCustomValidity(checkRoomCapacity(roomNumberSelect.value, capacitySelect.value));

  capacitySelect.reportValidity();
});

capacitySelect.addEventListener('change', () => {
  capacitySelect.setCustomValidity(checkRoomCapacity(roomNumberSelect.value, capacitySelect.value));

  capacitySelect.reportValidity();
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
});

export { adForm, adFormAddress };
