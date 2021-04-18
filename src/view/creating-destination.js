import {getRandomArrayItem, generateDate, getRandomNumber, shuffle} from '../utils';
import {CITIES, DESCRIPTIONS, EVENT_TYPES, OFFERS} from '../mocks/data';

class CreateEventsState {
  generatePhotos() {
    const count = getRandomNumber(1, 6);

    return [...Array(count)].map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
  }

  generateOffers() {
    const count = getRandomNumber(0, 5);

    return [...Array(count)].map((it, i) => OFFERS[i]);
  }

  generateDescription(descriptions) {
    const count = getRandomNumber(1, 4);

    return shuffle(descriptions.slice())
      .slice(0, count)
      .join(' ');
  }

  generateEvent(index, resultArray) {
    const result = {
      type: getRandomArrayItem([...EVENT_TYPES.transfers, ...EVENT_TYPES.activities]),
      city: getRandomArrayItem(CITIES),
      photos: this.generatePhotos(),
      offers: this.generateOffers(),
      description: this.generateDescription(DESCRIPTIONS),
      price: getRandomNumber(10, 1000),
      favorite: Boolean(getRandomNumber(-1, 1)),
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

    return result;
  }

  generateEvents(count) {

    const result = [];
    for (let i = 0; i <= count; i++) {
      result.push(this.generateEvent(i, result));
    }
    return result;
  }
}


export {CreateEventsState};
