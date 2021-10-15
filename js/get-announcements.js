import { getObjAnnouncement } from './get-announcement.js';

function getAnnouncements (arrayLength, checkinTimes, checkoutTimes, feature, photo, type) {
  const announcements = [];
  for (let index = 0; index < arrayLength; index++) {
    announcements[index] = getObjAnnouncement(checkinTimes, checkoutTimes, feature, photo, type, index);
  }
  return announcements;
}

export { getAnnouncements };
