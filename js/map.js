import { activateForm } from './form-control.js';
import { adForm, adFormAddress } from './ad-form.js';
import { mapForm, mapFormSelects, mapFormCheckboxes } from './map-form.js';
//import { checkins, checkouts, features, types, photos, quantityOfAnnouncements } from './initial-data.js';
//import { getAnnouncements } from './get-announcements.js';
import { createAnnouncementPopup } from './create-popup-announcement.js';
import { createLoaded } from './create-loaded.js';

const PIN_SIZE = 40;
const MAIN_PIN_SIZE = 52;
const DATA_HOST = 'https://24.javascript.pages.academy/keksobooking/data';
const QUANTITY_OF_MARKERS = 10;
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
  const remainingObjects = markerDataObjects.slice(0, QUANTITY_OF_MARKERS);
  remainingObjects.forEach((markerData) => {
    const {lat, lng} = markerData.location;

    const icon = L.icon({
      iconUrl: '/img/pin.svg',
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
      if (announcementObject.offer.price < 10000 || announcementObject.offer.price > 50000) {
        isAnnouncementSuitable = false;
      }
      break;
    case 'low':
      if (announcementObject.offer.price >= 10000) {
        isAnnouncementSuitable = false;
      }
      break;
    case 'high':
      if (announcementObject.offer.price <= 50000) {
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
  iconUrl: 'img/main-pin.svg',
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

createLoaded(createMarkers, showErrPopup, DATA_HOST)
  .then((data) => {
    //console.log(data);
    mapFormSelects.forEach((select) => {
      select.addEventListener('change', (evt) => {
        const selectedProrety = evt.target.name.slice(8);
        chosenAnnouncementsSettings[selectedProrety] = evt.target.value;
        const result = data.filter((element) => filterAnnouncement(element));
        markerGroup.clearLayers();
        createMarkers(result);
      });
    });
    mapFormCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (evt) => {
        const selectedProrety = evt.target.value;
        //console.log(selectedProrety);
        chosenAnnouncementsSettings.features[selectedProrety] = evt.target.checked;
        //console.log(chosenAnnouncementsSettings);
        const result = data.filter((element) => filterAnnouncement(element));
        markerGroup.clearLayers();
        createMarkers(result);
      });
    });
  });
/*
const someText = 'hi';
function consText (text) {
  console.log(text);
}
const listener = function (evt) {
  console.log(evt.target);
  consText (someText);
  document.removeEventListener('click', listener);
};

document.addEventListener('click', listener);*/

export { map, mainPinMarker };
