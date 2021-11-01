import { activateForm } from './form-control.js';
import { adForm, adFormAddress } from './ad-form.js';
import { mapForm } from './map-form.js';
//import { checkins, checkouts, features, types, photos, quantityOfAnnouncements } from './initial-data.js';
//import { getAnnouncements } from './get-announcements.js';
import { createAnnouncementPopup } from './create-popup-announcement.js';
import { createLoaded } from './create-loaded.js';

const PIN_SIZE = 40;
const MAIN_PIN_SIZE = 52;
const DATA_HOST = 'https://24.javascript.pages.academy/keksobooking/data';
const template = document.querySelector('#card').content.querySelector('.popup');
const map = L.map('map-canvas');

function showErrPopup (err) {
  const errMapPopur = document.createElement('div');
  errMapPopur.textContent = `Произошла ошибка: ${err}`;
  errMapPopur.style.backgroundColor = 'red';
  errMapPopur.style.width = '100%';
  errMapPopur.style.textAlign = 'center';
  document.querySelector('.map').prepend(errMapPopur);
}

function createMarkers (markerDataObjects) {
  markerDataObjects.forEach((markerData) => {
    const {lat, lng} = markerData.location;

    const icon = L.icon({
      iconUrl: './../img/pin.svg',
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
      .addTo(map)
      .bindPopup(createAnnouncementPopup(markerData, template));
  });
}

map.on('load', () => {
  activateForm(adForm);
  activateForm(mapForm);
  adFormAddress.value = '35.68034, 139.76902';
})
  .setView({
    lat: 35.68034,
    lng: 139.76902,
  }, 14);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './../img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
  iconAnchor: [(MAIN_PIN_SIZE / 2), MAIN_PIN_SIZE],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68034,
    lng: 139.76902,
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

createLoaded(createMarkers, showErrPopup, DATA_HOST);

export { map, mainPinMarker };
