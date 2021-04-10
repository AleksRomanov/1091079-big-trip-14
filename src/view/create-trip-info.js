import {getFormattedDate} from '../utils';

class CreateTripInfo {
  constructor(props) {
    this._state = props;
  }

  getEventsSum() {
    return this._state.reduce((accumulator, current) => {
      return accumulator + current.price;
    }, 0);
  }

  getElement() {
    return `
     <section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${this._state[0]['city']} &mdash; ... &mdash; ${this._state[this._state.length - 1]['city']}</h1>

          <p class="trip-info__dates">${getFormattedDate(this._state[0]['startDate'], 'MMM-DD')}
              &nbsp;&mdash;&nbsp;
              ${getFormattedDate(this._state[this._state.length - 1]['endDate'], 'DD')}
             </p>
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${this.getEventsSum()}</span>
        </p>
    </section>
    `;
  }
}

export {CreateTripInfo};
