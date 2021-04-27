import {OFFERS_SORT_OPTIONS} from '../const';
import {createElement} from '../utils';

const createViewOptionsElements = (typeTitles) => {
  return typeTitles.map((type, index) => {
    if (index === 0) {
      return `<div class="trip-sort__item  trip-sort__item--${type}">
                       <input id="sort-day" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
                        <label class="trip-sort__btn" for="sort-day">${type}</label>
                    </div>`;
    } else {
      return `<div class="trip-sort__item  trip-sort__item--${type}">
                       <input id="sort-day" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-day">
                        <label class="trip-sort__btn" for="sort-day">${type}</label>
                    </div>`;
    }
  }).join('');
};

const createSortingToggle = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
                   ${createViewOptionsElements(OFFERS_SORT_OPTIONS)}
            </form>`;
};

export default class SortingToggle {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortingToggle();
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
