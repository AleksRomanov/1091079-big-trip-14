import {DATA_VIEW_PERIOD} from '../const';
import Abstract from './abstract';

const createViewTimeElements = (typeTitles) => {

  return typeTitles.map((element, index) => {
    if (index === 0) {
      return `<div class="trip-filters__filter">

<input id="${element.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${element.type}" data-sort-type=${element.type} checked>
    <label class="trip-filters__filter-label" for="${element.id}">${element.title}</label></div>`;
    } else {
      return `<div class="trip-filters__filter">

<input id="${element.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${element.type}" data-sort-type=${element.type}>
    <label class="trip-filters__filter-label" for="${element.id}">${element.title}</label></div>`;
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

  // _sortTimeChangeHandler(evt) {
  //   this._callback.sortTypeChange(evt.target.dataset.sortType);
  // }

  _filterTypeChangeHandler(evt) {
    // evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    const filterButtons = this.getElement().querySelectorAll('input');
    console.log(filterButtons);
    filterButtons.forEach((button) => {
      button.addEventListener('click', this._filterTypeChangeHandler);
    });
  }

  // setSortTimeChangeHandler(callback) {
  //   this._callback.sortTypeChange = callback;
  //   const filterButtons = this.getElement().querySelectorAll('input');
  //   filterButtons.forEach((button) => {
  //     button.addEventListener('click', this._sortTimeChangeHandler);
  //
  //   });
  //
  // }
}

