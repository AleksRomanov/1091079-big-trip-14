import {DATA_VIEW_PERIOD} from '../const';
import Abstract from './abstract';

const createViewTimeElements = (typeTitles) => {

  return typeTitles.map((element, index) => {
    if (index === 0) {
      return `
<input id="${element.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${element.type}" checked>
    <label class="trip-filters__filter-label" for="${element.id}">${element.title}</label>`;
    } else {
      return `
<input id="${element.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${element.type}">
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
  getTemplate() {
    return createFilters();
  }
}

