import {createElement, getRandomArrayItem, getRandomDate, getRandomNumber, shuffle} from '../utils';
import {CITIES, DESCRIPTIONS, EVENT_TYPES, OFFERS} from '../mocks/data';

const SHOWING_CITIES_COUNT = 3;

const getTitle = (events) => {
  if (events.length > SHOWING_CITIES_COUNT) {
    return `${events[0].city} &mdash; ... &mdash; ${events[events.length - 1].city}`;
  } else {
    return events
      .map((event, index) => {
        return `${event.city} ${index < events.length - 1 ? '-' : ''} `;
      })
      .join(' ');
  }
};

const getDates = (startDate, endDate) => {
  const month = new Date(startDate).toLocaleString('en-US', {month: 'short'});
  const startDay = new Date(startDate).getDate();
  const endDay = new Date(endDate).getDate();

  return `${month} ${startDay} &nbsp;&mdash;&nbsp; ${endDay}`;
};

class CreateDestination {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    const dates = getDates(this._events[0].startDate, this._events[this._events.length - 1].endDate);
    // console.log(dates);

    return `
      <div class="trip-info__main">
        <h1 class="trip-info__title">
          ${getTitle(this._events)}
        </h1>

        <p class="trip-info__dates">${dates}</p>
      </div>
    `;
  }

  getElement() {
    if (!this._element) {
      this._element = this.getTemplate();
    }

    return this._element;
  }
}

const generatePhotos = () => {
  const count = getRandomNumber(1, 6);

  return [...Array(count)].map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
};

const generateOffers = () => {
  const count = getRandomNumber(0, 6);

  return [...Array(count)].map((it, i) => OFFERS[i]);
};

const generateDescription = (descriptions) => {
  const count = getRandomNumber(1, 4);

  return shuffle(descriptions.slice())
    .slice(0, count)
    .join(' ');
};

const generateEvent = () => {
  const firstDate = getRandomDate();
  const secondDate = getRandomDate();

  return {
    type: getRandomArrayItem([...EVENT_TYPES.transfers, ...EVENT_TYPES.activities]),
    city: getRandomArrayItem(CITIES),
    photos: generatePhotos(),
    offers: generateOffers(),
    description: generateDescription(DESCRIPTIONS),
    startDate: Math.min(firstDate, secondDate),
    endDate: Math.max(firstDate, secondDate),
    price: getRandomNumber(10, 200),
  };
};

const generateEvents = (count) => {
  return [...Array(count)].map(() => generateEvent());
};

// const createDestination = () => {
//   return `<section class="trip-main__trip-info  trip-info">
//       <div class="trip-info__main">
//         <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
//         <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
//       </div>
//     </section>`;
// };
//
export {generateEvents, CreateDestination};
// export {TripInfo};
