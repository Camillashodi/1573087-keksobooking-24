import { activateForm } from './form-control.js';
import { adForm, adFormAddress } from './ad-form.js';
import { mapForm } from './map-form.js';
import { checkins, checkouts, features, types, photos, quantityOfAnnouncements } from './initial-data.js';
import { getAnnouncements } from './get-announcements.js';
import { createAnnouncementPopup } from './create-popup-announcement.js';
//map-canvas
//35.6895
//139.692

const map = L.map('map-canvas')
  .on('load', () => {
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
  iconUrl: '../img/main-pin.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
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

const announcements = getAnnouncements(quantityOfAnnouncements, checkins, checkouts, features, photos, types);
const template = document.querySelector('#card').content.querySelector('.popup');
//console.log(announcements);

announcements.forEach((announcement) => {
  const {lat, lng} = announcement.location;

  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
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
    .bindPopup(createAnnouncementPopup(announcement, template));
});
