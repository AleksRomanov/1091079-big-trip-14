import {getRandomArrayItem, generateDate, getRandomNumber, shuffle} from '../utils';
import {CITIES, DESCRIPTIONS, EVENT_TYPES, OFFERS} from '../mocks/data';
import {PAST_EVENTS_COUNT} from '../main';

const SHOWING_CITIES_COUNT = 3;


class CreateDestination {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    const dates = getDates(this._events[0].startDate, this._events[this._events.length - 1].endDate);
    return `
      <section class="trip-main__trip-info trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">
            ${getTitle(this._events)}
          </h1>

          <p class="trip-info__dates">${dates}</p>
        </div>
      </section>
    `;
  }

  getElement() {
    if (!this._element) {
      this._element = this.getTemplate();
    }

    return this._element;
  }
}

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

class CreateEventsState {
  constructor(props) {
    // this._pastEventsCount = pastEventsCount;
    // [_state, _sss] = props;
    this._eventsCount = props[0];
    this._pastEventsCount = props[1];
  }

  generateEvent(item, index) {
    // console.log(index + ' state before if');
    // console.log(this._pastEventsCount + ' index before if');
    // console.log(this._props + ' props before if');

    // if (++index <= this._pastEventsCount) {
    //   const firstDate = generateDate();
    //
    //   this._pastEventsCount--;
    // }

    // console.log(this._pastEventsCount + ' pastEventsCount ' + index + ' iteration number');

    const firstDate = generateDate();
    const secondDate = generateDate();
    const result = {
      type: getRandomArrayItem([...EVENT_TYPES.transfers, ...EVENT_TYPES.activities]),
      city: getRandomArrayItem(CITIES),
      photos: generatePhotos(),
      offers: generateOffers(),
      description: generateDescription(DESCRIPTIONS),
      startDate: Math.min(firstDate, secondDate),
      endDate: Math.max(firstDate, secondDate),
      price: getRandomNumber(10, 200),
    };
    // console.log(result);


    return result;
  };

  generateEvents() {
    // console.log(this._props + ' :props');
    return [...Array(this._eventsCount)].map((item, index) => this.generateEvent(item, index));
  };

}


export {CreateEventsState};
