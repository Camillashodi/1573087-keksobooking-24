function createAnnouncementPopup (announcementObj, templateOfAnnoucement) {
  const namesOfTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
    hotel: 'Отель',
  };

  const announcementPopup = templateOfAnnoucement.cloneNode(true);

  const announcementPopupTitle = announcementPopup.querySelector('.popup__title');
  if (announcementObj.offer.title) {
    announcementPopupTitle.textContent = announcementObj.offer.title;
  } else {
    announcementPopupTitle.remove();
  }

  const announcementPopupAddress = announcementPopup.querySelector('.popup__text--address');
  if (announcementObj.offer.address) {
    announcementPopupAddress.textContent = announcementObj.offer.address;
  } else {
    announcementPopupAddress.remove();
  }

  const announcementPopupPrice = announcementPopup.querySelector('.popup__text--price');
  if (announcementObj.offer.price) {
    announcementPopupPrice.firstChild.textContent = `${announcementObj.offer.price} `;
  } else {
    announcementPopupPrice.remove();
  }

  const announcementPopupType = announcementPopup.querySelector('.popup__type');
  if (namesOfTypes[announcementObj.offer.type]) {
    announcementPopupType.textContent = namesOfTypes[announcementObj.offer.type];
  } else {
    announcementPopupType.remove();
  }

  const announcementPopupDescription = announcementPopup.querySelector('.popup__description');
  if (announcementObj.offer.description) {
    announcementPopupDescription.textContent = announcementObj.offer.description;
  } else {
    announcementPopupDescription.remove();
  }

  const announcementPopupCapacity = announcementPopup.querySelector('.popup__text--capacity');
  if (announcementObj.offer.rooms && announcementObj.offer.guests) {
    const rommsString = announcementObj.offer.rooms.toString();
    const guestsString = announcementObj.offer.guests.toString();
    let textCapacity = `${rommsString} комнат`;
    if ((+rommsString[rommsString.length - 1]) > 1 && (+rommsString[rommsString.length - 1]) < 5) {
      textCapacity = `${rommsString} комнаты`;
    }
    if ((+rommsString[rommsString.length - 1]) === 1) {
      textCapacity = `${rommsString} комната`;
    }
    announcementPopupCapacity.textContent = `${textCapacity} для ${announcementObj.offer.guests} гост${(+guestsString[guestsString.length - 1]) === 1 ? 'я' : 'ей'}`;

  } else {
    announcementPopupCapacity.remove();
  }

  const announcementPopupTime = announcementPopup.querySelector('.popup__text--time');
  if (announcementObj.offer.checkin && announcementObj.offer.checkout) {
    announcementPopupTime.textContent = `Заезд после ${announcementObj.offer.checkin}, выезд до ${announcementObj.offer.checkout}`;
  } else {
    announcementPopupTime.remove();
  }

  const announcementPopupFeatureList = announcementPopup.querySelector('.popup__features');
  const announcementPopupFeatures = announcementPopupFeatureList.querySelectorAll('.popup__feature');
  if (announcementObj.offer.features && announcementObj.offer.features.length) {
    const coppyArray = announcementObj.offer.features.slice();
    for (let i = 0; i < announcementPopupFeatures.length; i++) {
      let isFeatureExist = false;
      const featureName = announcementPopupFeatures[i].className;
      for (let j = 0; j < coppyArray.length; j++) {
        if (featureName.indexOf(`--${coppyArray[j]}`) !== -1) {
          coppyArray.splice(j, 1);
          isFeatureExist = true;
          break;
        }
      }
      if (!isFeatureExist) {
        announcementPopupFeatures[i].remove();
      }
    }
    coppyArray.length = 0;
  } else {
    announcementPopupFeatureList.innerHTML = '';
  }

  const announcementPopupPhotos = announcementPopup.querySelector('.popup__photos');
  if (announcementObj.offer.photos) {
    const photoElement = announcementPopupPhotos.querySelector('.popup__photo').cloneNode(true);
    announcementPopupPhotos.querySelector('.popup__photo').remove();
    announcementObj.offer.photos.forEach((photo) => {
      const announcementPopupPhoto = photoElement.cloneNode(true);
      announcementPopupPhoto.setAttribute('src', photo);
      announcementPopupPhotos.appendChild(announcementPopupPhoto);
    });
  } else {
    announcementPopupPhotos.querySelector('.popup__photo').remove();
  }

  const announcementAvatar = announcementPopup.querySelector('.popup__avatar');
  if (announcementObj.author.avatar) {
    announcementAvatar.setAttribute('src', announcementObj.author.avatar);
  } else {
    announcementAvatar.remove();
  }

  return announcementPopup;
}

export { createAnnouncementPopup };
