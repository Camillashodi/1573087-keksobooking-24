import {checkins, checkouts, features, types, photos} from './initial-data.js';
import {getObjAnnouncement} from './get-announcement.js';
import {createAnnouncementPopup} from './create-popup-announcement.js';

const mapCamvas = document.querySelector('.map__canvas');
const template = document.querySelector('#card').content.querySelector('.popup');

createAnnouncementPopup(getObjAnnouncement(checkins, checkouts, features, photos, types, 7), mapCamvas, template);
