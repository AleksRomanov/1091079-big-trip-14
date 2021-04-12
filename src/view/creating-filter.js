import {DATA_VIEW_PERIOD} from '../mocks/data';

class CreateFilterTime {
  constructor() {
    this._typeTitles = DATA_VIEW_PERIOD;
  }

  createViewTimeElements(typeTitles) {
    let elements = ' ';

    elements = typeTitles.map((element, index) => {
      if (index === 0) {
        return `<input id="${element.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
         <label class="trip-filters__filter-label" for="${element.id}">${element.title}</label>`;
      } else {
        return `<input id="${element.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
         <label class="trip-filters__filter-label" for="${element.id}">${element.title}</label>`;
      }
    }).join('');
    return elements;
  }

  getElement() {
    return `<form class="trip-filters" action="#" method="get">
                <div class="trip-filters__filter">
                   ${this.createViewTimeElements(this._typeTitles)}
                </div>
            </form>
    `;
  }
}

export {CreateFilterTime};
