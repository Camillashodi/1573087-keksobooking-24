import './ad-form.js';
import './map-form.js';
import { checkins, checkouts, features, types, photos, quantityOfAnnouncements } from './initial-data.js';
import { getAnnouncements } from './get-announcements.js';
import { createAnnouncementsFragment } from './create-announcements-fragment.js';

const mapCamvas = document.querySelector('.map__canvas');
const template = document.querySelector('#card').content.querySelector('.popup');
const announcements = getAnnouncements(quantityOfAnnouncements, checkins, checkouts, features, photos, types);

const announcementsFragment = createAnnouncementsFragment(announcements, template);

mapCamvas.appendChild(announcementsFragment.firstChild);
