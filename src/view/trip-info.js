import {getFormattedDate, sortByDay} from '../utils/dates';
import Abstract from './abstract';
import {TRIP_LENGTH_DATA} from '../const';

const getEventsSum = (state) => {
  return state.reduce((accumulator, event) => {
    let eventOfferSumm = 0;
    if (event.offers.length) {
      eventOfferSumm = event.offers.reduce((acc, cur) => {
        return acc + cur.price;
      }, 0);
    }
    return accumulator + eventOfferSumm + event.price;
  }, 0);
};

const getSecondDestination = (state) => {
  const destinationSeparator = '...';

  return state.length > 3 ? destinationSeparator : state[1].destination.city;
};

const createTripInfoTemplate = (events) => {
  const sortedEvents = events.sort(sortByDay);
  const firstCity = sortedEvents[0].destination['city'];
  const finalCity = sortedEvents[sortedEvents.length - 1].destination['city'];

  const firstDate = getFormattedDate(sortedEvents[0]['startDate'], 'MMM DD');
  const finalDate = getFormattedDate(sortedEvents[sortedEvents.length - 1]['endDate'], 'MMM DD');
  const totalCost = getEventsSum(events);
  const getTripTotalDestination = () => {
    if (sortedEvents.length >= TRIP_LENGTH_DATA.LONG_TRIP) {
      return `${firstCity} &mdash; ${getSecondDestination(sortedEvents)} &mdash; ${finalCity}`;
    } else if (sortedEvents.length === TRIP_LENGTH_DATA.SHORT_TRIP) {
      return `${firstCity} &mdash; ${finalCity}`;
    } else {
      return `${firstCity}`;
    }
  };

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getTripTotalDestination()}</h1>

      <p class="trip-info__dates">${firstDate}
          &nbsp;&mdash;&nbsp;
          ${finalDate}
         </p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>
</section>`;
};

export default class TripInfo extends Abstract {
  constructor(state) {
    super();
    this._state = state;
  }

  getTemplate() {
    return this._state.length > 0 ? createTripInfoTemplate(this._state) : null;
  }
}

