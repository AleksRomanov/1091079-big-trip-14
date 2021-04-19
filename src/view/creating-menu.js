import {DATA_VIEW_TYPES} from '../const';

class CreateMenu {

  createViewTypeElements(typeTitles) {
    return typeTitles.map((element, index) => {
      return index === 0 ? `<a class="trip-tabs__btn trip-tabs__btn--active" href="#">${element}</a>` : `<a class="trip-tabs__btn" href="#">${element}</a>`;
    }).join('');
  }

  getElement() {
    return `
      <nav class="trip-controls__trip-tabs  trip-tabs">
        ${this.createViewTypeElements(DATA_VIEW_TYPES)}
      </nav>
    `;
  }
}

export {CreateMenu};
