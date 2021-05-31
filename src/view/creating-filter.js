import {DATA_VIEW_PERIOD} from '../const';
import Abstract from './abstract';

const createViewTimeElements = (typeTitles) => {

  return typeTitles.map(({type, id, title}, index) => {
    if (index === 0) {
      return `<div class="trip-filters__filter">

<input id="${id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" data-sort-type=${type} checked>
    <label class="trip-filters__filter-label" for="${id}">${title}</label></div>`;
    } else {
      return `<div class="trip-filters__filter">

<input id="${id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" data-sort-type=${type}>
    <label class="trip-filters__filter-label" for="${id}">${title}</label></div>`;
    }
  }).join('');
};

const createFilters = () => {
  return `<form class="trip-filters" action="#" method="get">
       ${createViewTimeElements(DATA_VIEW_PERIOD)}
</form>`;
};


export default class Filters extends Abstract {
  constructor() {
    super();
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilters();
  }

  _filterTypeChangeHandler(evt) {
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    const filterButtons = this.getElement().querySelectorAll('input');
    filterButtons.forEach((button) => {
      button.addEventListener('click', this._filterTypeChangeHandler);
    });
  }
}

