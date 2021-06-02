import {DATA_VIEW_TYPES} from '../const';
import Abstract from './abstract';

const createViewTypeElements = (typeTitles) => {
  return typeTitles.map((element, index) => {
    return index === 0 ? `<a class="trip-tabs__btn trip-tabs__btn--active" href="#">${element}</a>` : `<a class="trip-tabs__btn" href="#">${element}</a>`;
  }).join('');
};

const createModesToggle = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${createViewTypeElements(DATA_VIEW_TYPES)}
      </nav>
    `;
};

export default class ViewModes extends Abstract{
  getTemplate() {
    return createModesToggle();
  }
}
