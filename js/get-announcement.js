import {getObjAuthor, getObjLocation, getObjOffer} from './create-data.js';

function getObjAnnouncement (checkinTimes, checkoutTimes, feature, photo, type, indexNumber) {
  const location = getObjLocation();
  return {
    author: getObjAuthor(indexNumber),
    location: location,
    offer: getObjOffer(location.lat, location.lng, checkinTimes, checkoutTimes, feature, photo, type),
  };
}

export {getObjAnnouncement};
