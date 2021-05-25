import {getFormattedDate} from '../utils/dates';
import Abstract from './abstract';

const getEventsSum = (state) => {
  return state.reduce((accumulator, current) => {
    return accumulator + current.price;
  }, 0);
};

const getSecondDestination = (state) => {
  const destinationSeparator = '...';
  console.log(state);
  return state.length > 1 ? state[1].destination.city : destinationSeparator;
};

const createTripInfoTemplate = (state) => {
  const firstCity = state[0].destination['city'];
  const finalCity = state[state.length - 1].destination['city'];
  const firstDate = getFormattedDate(state[0]['startDate'], 'MMM-DD');
  const finalDate = getFormattedDate(state[state.length - 1]['endDate'], 'DD');
  const totalCost = getEventsSum(state);
  const getTripTotalDestination = () => {
    // console.log(state.length);
    if(state.length >= 2) {
      return `${firstCity} &mdash; ${getSecondDestination(state)} &mdash; ${finalCity}`;
    } else if (state.length === 1){
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
</section>
    `;
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

