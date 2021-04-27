import {getRandomArrayItem, generateDate, getRandomNumber, shuffle, getObjectByKeyInArray} from '../utils';
import {CITIES, DESCRIPTIONS, EVENT_TYPES, OFFERS} from '../mocks/data';

class CreateEventsState {
  generatePhotos() {
    const count = getRandomNumber(1, 6);

    return [...Array(count)].map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
  }

  generateOffers(type) {
    const neededOffer = getObjectByKeyInArray(OFFERS, 'type' ,type);
    // OFFERS.forEach((offer) => {
    //   if (offer.type === type) {
    //     return neededOffer = offer;
    //   }
    // });
    const count = getRandomNumber(0, 5);
    return shuffle(neededOffer.offers.slice())
      .slice(0, count);
  }

  generateDescription(descriptions) {
    const count = getRandomNumber(1, 4);

    return shuffle(descriptions.slice())
      .slice(0, count)
      .join(' ');
  }

  generateDestination() {

    return {
      city: getRandomArrayItem(CITIES),
      photos: this.generatePhotos(),
      description: this.generateDescription(DESCRIPTIONS),

    };
  }

  generateEvent(index, resultArray) {
    const result = {
      type: getRandomArrayItem([...EVENT_TYPES]),
      destination: this.generateDestination(),
      price: getRandomNumber(10, 1000),
      favorite: Boolean(getRandomNumber(-1, 1)),
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

    result.offers = this.generateOffers(result.eventType);

    // console.log(result);

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
