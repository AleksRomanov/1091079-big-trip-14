import {DATA_VIEW_PERIOD} from '../const';
import Abstract from './abstract';

const createViewTimeElements = (typeTitles) => {

  return typeTitles.map((element, index) => {
    if (index === 0) {
      return `
<input id="${element.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${element.type}" data-sort-type=${element.type} checked>
    <label class="trip-filters__filter-label" for="${element.id}">${element.title}</label>`;
    } else {
      return `
<input id="${element.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${element.type}" data-sort-type=${element.type}>
    <label class="trip-filters__filter-label" for="${element.id}">${element.title}</label>`;
    }
  }).join('');
};

const createFilters = () => {
  return `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
       ${createViewTimeElements(DATA_VIEW_PERIOD)}
    </div>
</form>
    `;
};


export default class Filters extends Abstract{
  constructor() {
    super();

    this._sortTimeChangeHandler = this._sortTimeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilters();
  }

  _sortTimeChangeHandler(evt) {
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTimeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    const filterButtons = this.getElement().querySelectorAll('input');
    filterButtons.forEach((button) => {
      button.addEventListener('click', this._sortTimeChangeHandler);

    });

  }
}

