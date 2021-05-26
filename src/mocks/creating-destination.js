import {generateDate} from '../utils/dates';
import {CITIES, DESCRIPTIONS, EVENT_TYPES, OFFERS} from './data';
import {nanoid} from 'nanoid';
import {getRandomArrayItem, getRandomNumber, shuffle} from '../utils/common';

const generatePhotos = () => {
  const count = getRandomNumber(1, 6);

  return [...Array(count)].map(() => `https://picsum.photos/300/150?r=${Math.random()}`);
};

const generateOffers = (type) => {
  const neededOffer = OFFERS.find((offer) => {
    return offer['type'] === type ? offer : null;
  });


  const count = getRandomNumber(0, 5);
  return neededOffer.offers.slice().sort(shuffle).slice(0, count);
};

const generateDescription = (descriptions) => {
  const count = getRandomNumber(1, 4);
  return descriptions.slice().sort(shuffle).slice(0, count).join(' ');
};

const generateDestination = () => {

  return {
    city: getRandomArrayItem(CITIES),
    photos: generatePhotos(),
    description: generateDescription(DESCRIPTIONS),
  };
};

const generateEvent = (index, resultArray) => {
  const result = {
    type: getRandomArrayItem([...EVENT_TYPES]),
    destination: generateDestination(),
    price: getRandomNumber(10, 1000),
    favorite: Boolean(getRandomNumber(-1, 1)),
    id: nanoid(),
    get eventType() {
      return this.type;
    },
  };

  if (!index) {
    const firstDate = generateDate(0, true);

    result.startDate = firstDate;
    result.endDate = generateDate(firstDate);
  } else {
    const startDate = resultArray[--index].endDate;
    result.startDate = startDate;
    result.endDate = generateDate(startDate);
  }

  result.offers = generateOffers(result.eventType);
  return result;
};

const generateEvents = (count) => {

  const result = [];
  if (count > 0) {
    for (let i = 0; i <= count; i++) {
      result.push(generateEvent(i, result));
    }
  }
  return result;
};
// }


export {generateEvents, generatePhotos, generateDescription};
