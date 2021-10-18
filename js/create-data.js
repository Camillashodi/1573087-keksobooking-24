import { getRandomInteger, getRandomFloat, getValuesFromArray } from './utils-functions.js';

function getObjAuthor (indexnumber) {
  const userId = indexnumber + 1;
  return {
    avatar: `img/avatars/user${(userId < 10 ? `0${userId}` : userId)}.png`,
  };
}

function getObjLocation () {
  return {
    lat: getRandomFloat(35.65000, 35.70000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5),
  };
}

function getObjOffer (locationLat, locationlng, checkinTimes, checkoutTimes, feature, photo, type) {
  return {
    title: 'Предложение о проживании по адресу',
    description: 'Подробности можно уточнить по телефону.',
    address: `${locationLat.toString()}, ${locationlng.toString()}`,
    price: getRandomInteger(0, Number.MAX_SAFE_INTEGER),
    rooms: getRandomInteger(0, Number.MAX_SAFE_INTEGER),
    guests: getRandomInteger(0, Number.MAX_SAFE_INTEGER),
    checkin: checkinTimes[getRandomInteger(0, checkinTimes.length - 1)],
    checkout: checkoutTimes[getRandomInteger(0, checkoutTimes.length - 1)],
    features: getValuesFromArray(feature),
    photos: getValuesFromArray(photo),
    type: type[getRandomInteger(0, type.length - 1)],
  };
}

export { getObjAuthor, getObjLocation, getObjOffer };
