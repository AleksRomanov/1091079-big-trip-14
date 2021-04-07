import {DATA_VIEW_TYPES} from '../mocks/data';

class CreateMenu {
  constructor() {
    this._typeTitles = DATA_VIEW_TYPES;
  }

  createViewTypeElements(typeTitles) {
    let elements = ' ';
    typeTitles.forEach((element, index) => {
      if (index === 0) {
        elements += `<a class="trip-tabs__btn trip-tabs__btn--active" href="#">${element}</a>`;
      } else {
        elements += `<a class="trip-tabs__btn" href="#">${element}</a>`;
      }
    });
    return elements;
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
