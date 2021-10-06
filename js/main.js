import {checkins, checkouts, features, types, photos, quantityOfAnnouncements} from './initial-data.js';
import {getAnnouncements} from './get-announcements.js';

getAnnouncements(quantityOfAnnouncements, checkins, checkouts, features, photos, types);
