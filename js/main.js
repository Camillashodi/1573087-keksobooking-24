const checkinTime = ['12:00', '13:00', '14:00'];
const checkoutTime = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


function getRandomInteger (startOfRange, endOfRange) {
  if (!(typeof startOfRange === 'number') || !(typeof endOfRange === 'number')) {
    return null;
  }
  if (startOfRange < 0) {
    return null;
  }
  if (endOfRange < 0) {
    return null;
  }
  if ((endOfRange - startOfRange) < 0) {
    return null;
  }
  if ((Math.floor(endOfRange) - Math.floor(startOfRange)) === 0 && !Number.isInteger(startOfRange)) {
    return null;
  }
  startOfRange = Math.ceil(startOfRange);
  endOfRange = Math.floor(endOfRange);
  return Math.floor(Math.random()*(endOfRange - startOfRange + 1) + startOfRange);
}

function getRandomFloat (startOfRange, endOfRange, scale) {
  if (!(typeof startOfRange === 'number') || !(typeof endOfRange === 'number') || !Number.isInteger(scale)) {
    return null;
  }
  if (startOfRange < 0) {
    return null;
  }
  if (endOfRange < 0) {
    return null;
  }
  if ((endOfRange - startOfRange) < 0) {
    return null;
  }
  return (+Number(Math.random()*(endOfRange - startOfRange) + startOfRange).toFixed(scale)); //я не понимаю почему он возвращает string без унарного опратора "+"?
}

function getValuesFromArray (array) {
  const copyArray = array.slice();
  const selectedArray = [];
  const quantityOfValues = getRandomInteger(1, copyArray.length);
  for (let i = 0; i < quantityOfValues; i++) {
    const randomInteger = getRandomInteger(0, copyArray.length - 1);
    selectedArray[i] = copyArray[randomInteger];
    copyArray.splice(randomInteger, 1);
  }
  copyArray.length = 0;
  return selectedArray;
}

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

function getObjAnnouncement (checkinTimes, checkoutTimes, feature, photo, type, indexNumber) {
  const location = getObjLocation();
  return {
    author: getObjAuthor(indexNumber),
    location: location,
    offer: getObjOffer(location.lat, location.lng, checkinTimes, checkoutTimes, feature, photo, type),
  };
}

function getAnnouncements (arrayLength, checkinTimes, checkoutTimes, feature, photo, type) {
  const announcements = [];
  for (let i = 0; i < arrayLength; i++) {
    announcements[i] = getObjAnnouncement(checkinTimes, checkoutTimes, feature, photo, type, i);
  }
  return announcements;
}

getAnnouncements(10, checkinTime, checkoutTime, features, photos, types);
