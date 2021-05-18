import {OFFERS_SORT_OPTIONS} from '../const';
import Abstract from './abstract';

const createViewOptionsElements = (typeTitles) => {
  return typeTitles.map((type, index) => {
    if (index === 0) {
      return `
<div class="trip-sort__item  trip-sort__item--${type}">
     <input id=${type} class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value=${type} data-sort-type=${type} checked>
      <label class="trip-sort__btn" for=${type}>${type}</label>
</div>`;
    } else {
      return `
<div class="trip-sort__item  trip-sort__item--${type}">
     <input id=${type} class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value=${type} data-sort-type=${type}>
      <label class="trip-sort__btn" for=${type}>${type}</label>
</div>`;
    }
  }).join('');
};

const createSortingToggle = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
       ${createViewOptionsElements(OFFERS_SORT_OPTIONS)}
</form>`;
};

export default class SortingToggle extends Abstract {
  constructor() {
    super();

    this._sortChangeHandler = this._sortChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingToggle();
  }

  _sortChangeHandler(evt) {
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortHandler(callback) {
    this._callback.sortTypeChange = callback;
    const sortButtons = this.getElement().querySelectorAll('input');
    sortButtons.forEach((button) => {
      button.addEventListener('click', this._sortChangeHandler);
    });

  }

}
