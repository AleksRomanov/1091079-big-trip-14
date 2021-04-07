import {getRandomNumber} from '../utils';

class CreatePrice {
  constructor() {
    this._price = getRandomNumber(1, 10000);
  }

  getElement() {
    return `
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._price}</span>
      </p>
    `;
  }

}

export {CreatePrice};
