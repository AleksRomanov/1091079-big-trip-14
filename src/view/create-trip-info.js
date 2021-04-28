import {createElement, getFormattedDate} from '../utils';

const getEventsSum = (state) => {
  return state.reduce((accumulator, current) => {
    return accumulator + current.price;
  }, 0);
};

const getSecondDestination = (state) => {
  const destinationSeparator = '...';
  return state.length > 1 ? destinationSeparator : state[1].city;
};

const createTripInfoTemplate = (state) => {
  const firstCity = state[0].destination['city'];
  const finalCity = state[state.length - 1].destination['city'];
  const firstDate = getFormattedDate(state[0]['startDate'], 'MMM-DD');
  const finalDate = getFormattedDate(state[state.length - 1]['endDate'], 'DD');
  const totalCost = getEventsSum(state);

  return `
<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${firstCity} &mdash; ${getSecondDestination(state)} &mdash; ${finalCity}</h1>

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

export default class TripInfo {
  constructor(state) {
    this._element = null;
    this._state = state;
  }

  getTemplate(state) {
    return createTripInfoTemplate(state);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._state));
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

