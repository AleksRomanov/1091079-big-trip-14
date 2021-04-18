import {DATA_VIEW_TYPES} from '../mocks/data';

class CreateMenu {
  constructor() {
    this._typeTitles = DATA_VIEW_TYPES;
  }

  createViewTypeElements(typeTitles) {
    return typeTitles.map((element, index) => {
      if (index === 0) {
        return `<a class="trip-tabs__btn trip-tabs__btn--active" href="#">${element}</a>`;
      } else {
        return `<a class="trip-tabs__btn" href="#">${element}</a>`;
      }
    }).join('');
  }

  getElement() {
    return `
      <nav class="trip-controls__trip-tabs  trip-tabs">
        ${this.createViewTypeElements(this._typeTitles)}
      </nav>
    `;
  }
}

export {CreateMenu};
