import {getRandomArrayItem, generateDate, getRandomNumber, shuffle} from '../utils';
import {CITIES, DESCRIPTIONS, EVENT_TYPES, OFFERS} from '../mocks/data';

class CreateEventsState {
  generatePhotos() {
    const count = getRandomNumber(1, 6);

    return [...Array(count)].map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
  }

  generateOffers(type) {
    // console.log(type);
    let neededOffer;

    OFFERS.forEach((offer, index) => {
      // console.log(offer);
      if (offer.type === type) {
        neededOffer = offer;
      }
    });
    const count = getRandomNumber(0, 5);

    // console.log(neededOffer.offers);
    //
    // for (let i = 0; i <= count; i++) {
    //
    //   console.log(i);
    // }

    return [...Array(count)].map((it, i) => {
      return it = neededOffer.offers[i];
      // console.log(i + 'i');
      // return neededOffer.offers[i].title;
      // return {dfds: 12};
    });
  }

  generateDescription(descriptions) {
    const count = getRandomNumber(1, 4);

    return shuffle(descriptions.slice())
      .slice(0, count)
      .join(' ');
  }

  generateEvent(index, resultArray) {
    const result = {
      type: getRandomArrayItem([...EVENT_TYPES]),
      city: getRandomArrayItem(CITIES),
      photos: this.generatePhotos(),
      description: this.generateDescription(DESCRIPTIONS),
      price: getRandomNumber(10, 1000),
      favorite: Boolean(getRandomNumber(-1, 1)),
      get eventType() {return this.type;},
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

    console.log(result);

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
