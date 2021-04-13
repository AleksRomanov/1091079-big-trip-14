import {getFormattedDate} from '../utils';

class CreateTripInfo {
  constructor(props) {
    this._state = props;
    this._firstCity = this._state[0]['city'];
    this._finalCity = this._state[this._state.length - 1]['city'];
    this._firstDate = getFormattedDate(this._state[0]['startDate'], 'MMM-DD');
    this._finalDate = getFormattedDate(this._state[this._state.length - 1]['endDate'], 'DD');
    this._totalCost = this.getEventsSum();
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
          <h1 class="trip-info__title">${this._firstCity} &mdash; ... &mdash; ${this._finalCity}</h1>

          <p class="trip-info__dates">${this._firstDate}
              &nbsp;&mdash;&nbsp;
              ${this._finalDate}
             </p>
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._totalCost}</span>
        </p>
    </section>
    `;
  }
}

export {CreateTripInfo};
