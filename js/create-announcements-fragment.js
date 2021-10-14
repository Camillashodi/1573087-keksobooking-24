import {createAnnouncementPopup} from './create-popup-announcement.js';

function createAnnouncementsFragment (announcementObjects, templateOfAnnoucement) {
  const announcementFragment = document.createDocumentFragment();
  announcementObjects.forEach((objAnnouncement) => {
    createAnnouncementPopup(objAnnouncement, announcementFragment, templateOfAnnoucement);
  });
  return announcementFragment;
}

export {createAnnouncementsFragment};
