import {OFFERS_SORT_OPTIONS} from '../mocks/data';

class CreateSortingOffers {
  constructor() {
    this._typeTitles = OFFERS_SORT_OPTIONS;
  }

  createViewOptionsElements(typeTitles) {
    let elements = ' ';
    typeTitles.forEach((element, index) => {
      if (index === 0) {
        elements += `<div class="trip-sort__item  trip-sort__item--${element}">
                       <input id="sort-day" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
                        <label class="trip-sort__btn" for="sort-day">${element}</label>
                    </div>`;
      } else {
        elements += `<div class="trip-sort__item  trip-sort__item--${element}">
                       <input id="sort-day" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-day">
                        <label class="trip-sort__btn" for="sort-day">${element}</label>
                    </div>`;
      }
    });
    return elements;
  }

  getElement() {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
                   ${this.createViewOptionsElements(this._typeTitles)}
            </form>`;
  }
}

export {CreateSortingOffers};
