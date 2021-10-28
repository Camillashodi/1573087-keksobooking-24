import { createAnnouncementPopup } from './create-popup-announcement.js';

function createAnnouncementsFragment (announcementObjects, templateOfAnnoucement) {
  const announcementFragment = document.createDocumentFragment();
  announcementObjects.forEach((objAnnouncement) => {
    announcementFragment.appendChild(createAnnouncementPopup(objAnnouncement, templateOfAnnoucement));
  });
  return announcementFragment;
}

export { createAnnouncementsFragment };
