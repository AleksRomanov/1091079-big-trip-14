import Abstract from './abstract';
import {filter} from '../utils/filter';

const createViewTimeElements = (filters, events) => {
  return filters.map(({type, name}, index) => {
    const filteredEvents = filter[type](events);
    const isChecked = index === 0 ? 'checked' : '';
    const isDisabled = filteredEvents.length === 0 ? 'disabled' : '';

    return `<div class="trip-filters__filter">
<input id="${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" data-sort-type=${type} ${isDisabled} ${isChecked}>
    <label class="trip-filters__filter-label" for="${type}">${name}</label></div>`;
  }).join('');
};

const createFilters = (filters, events) => {
  return `<form class="trip-filters" action="#" method="get">
       ${createViewTimeElements(filters, events)}
</form>`;
};

export default class Filters extends Abstract {
  constructor(filters, events) {
    super();
    this._filters = filters;
    this._events = events;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilters(this._filters, this._events);
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

