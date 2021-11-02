import { adForm, adFormAddress } from './ad-form.js';
import { mapForm } from './map-form.js';
import { map, mainPinMarker } from './map.js';

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

export { resetAllSettings };
