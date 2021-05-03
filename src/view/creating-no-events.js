import {createElement} from '../utils';

const createNoEvents = () => {
  return `<h2 class="visually-hidden">Trip events</h2>
<p class="trip-events__msg">Click New Event to create your first point</p>
    `;
};

export default class NoEvents {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoEvents();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

