import { activateForm } from './form-control.js';
import { adForm, adFormAddress } from './ad-form.js';
import { mapForm, mapFormSelects, mapFormCheckboxes } from './map-form.js';
import { createAnnouncementPopup } from './create-popup-announcement.js';
import { createLoaded } from './create-loaded.js';
import { debounce } from './utils/debounce.js';

const PIN_SIZE = 40;
const MAIN_PIN_SIZE = 52;
const DATA_HOST = 'https://24.javascript.pages.academy/keksobooking/data';
const QUANTITY_OF_MARKERS = 10;
const TOKIO_CENTER_LAT = 35.68034;
const TOKIO_CENTER_LNG = 139.76902;
const priceBoundariesForOptions = {
  low: 10000,
  high: 50000,
};
const template = document.querySelector('#card').content.querySelector('.popup');
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);
const chosenAnnouncementsSettings = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: {
    wifi: false,
    dishwasher: false,
    parking: false,
    washer: false,
    elevator: false,
    conditioner: false,
  },
};

function showErrPopup (err) {
  const errMapPopur = document.createElement('div');
  errMapPopur.textContent = `Произошла ошибка: ${err}`;
  errMapPopur.style.backgroundColor = 'red';
  errMapPopur.style.width = '100%';
  errMapPopur.style.textAlign = 'center';
  document.querySelector('.map').prepend(errMapPopur);
}

function createMarkers (markerDataObjects) {
  markerDataObjects.slice(0, QUANTITY_OF_MARKERS).forEach((markerData) => {
    const {lat, lng} = markerData.location;

    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [PIN_SIZE, PIN_SIZE],
      iconAnchor: [(PIN_SIZE / 2), PIN_SIZE],
    });

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(createAnnouncementPopup(markerData, template));
  });
}

function filterAnnouncement (announcementObject) {
  let isAnnouncementSuitable = true;
  if (chosenAnnouncementsSettings.type !== 'any' && announcementObject.offer.type !== chosenAnnouncementsSettings.type) {
    isAnnouncementSuitable = false;
  }
  switch (chosenAnnouncementsSettings.price) {
    case 'any':
      break;
    case 'middle':
      if (announcementObject.offer.price < priceBoundariesForOptions.low || announcementObject.offer.price > priceBoundariesForOptions.high) {
        isAnnouncementSuitable = false;
      }
      break;
    case 'low':
      if (announcementObject.offer.price >= priceBoundariesForOptions.low) {
        isAnnouncementSuitable = false;
      }
      break;
    case 'high':
      if (announcementObject.offer.price <= priceBoundariesForOptions.high) {
        isAnnouncementSuitable = false;
      }
      break;
  }
  if (chosenAnnouncementsSettings.rooms !== 'any' && announcementObject.offer.rooms !== (+chosenAnnouncementsSettings.rooms)) {
    isAnnouncementSuitable = false;
  }
  if (chosenAnnouncementsSettings.guests !== 'any' && announcementObject.offer.guests !== (+chosenAnnouncementsSettings.guests)) {
    isAnnouncementSuitable = false;
  }
  for (const key in chosenAnnouncementsSettings.features) {
    if (chosenAnnouncementsSettings.features[key]) {
      if (!announcementObject.offer.features || !announcementObject.offer.features.includes(key)) {
        isAnnouncementSuitable = false;
      }
    }
  }
  return isAnnouncementSuitable;
}

map.on('load', () => {
  activateForm(adForm);
  adFormAddress.value = `${TOKIO_CENTER_LAT}, ${TOKIO_CENTER_LNG}`;
  createLoaded(createMarkers, showErrPopup, DATA_HOST)
    .then((data) => {
      if (!data) {
        throw new Error('Did not get DATA from host');
      }
      activateForm(mapForm);
      const remainingObjects = data.slice(0, QUANTITY_OF_MARKERS);
      const createChosenMarkers = debounce(() => {
        const result = remainingObjects.filter((element) => filterAnnouncement(element));
        markerGroup.clearLayers();
        createMarkers(result);
      });
      mapFormSelects.forEach((select) => {
        select.addEventListener('change', (evt) => {
          const selectedProrety = evt.target.name.slice(8);
          chosenAnnouncementsSettings[selectedProrety] = evt.target.value;
          createChosenMarkers();
        });
      });
      mapFormCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (evt) => {
          const selectedProrety = evt.target.value;
          chosenAnnouncementsSettings.features[selectedProrety] = evt.target.checked;
          createChosenMarkers();
        });
      });
      mapForm.addEventListener('reset', () => {
        chosenAnnouncementsSettings.type = 'any',
        chosenAnnouncementsSettings.price = 'any',
        chosenAnnouncementsSettings.rooms = 'any',
        chosenAnnouncementsSettings.guests = 'any',
        chosenAnnouncementsSettings.features.wifi = false,
        chosenAnnouncementsSettings.features.dishwasher = false,
        chosenAnnouncementsSettings.features.parking = false,
        chosenAnnouncementsSettings.features.washer = false,
        chosenAnnouncementsSettings.features.elevator = false,
        chosenAnnouncementsSettings.features.conditioner = false,
        markerGroup.clearLayers();
        createMarkers(remainingObjects);
      });
    })
    .catch();
})
  .setView({
    lat: TOKIO_CENTER_LAT,
    lng: TOKIO_CENTER_LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [(MAIN_PIN_SIZE / 2), MAIN_PIN_SIZE],
});

const mainPinMarker = L.marker(
  {
    lat: TOKIO_CENTER_LAT,
    lng: TOKIO_CENTER_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  adFormAddress.value = `${(evt.target.getLatLng().lat).toFixed(5)}, ${(evt.target.getLatLng().lng).toFixed(5)}`;
});

export { map, mainPinMarker, TOKIO_CENTER_LAT, TOKIO_CENTER_LNG };
