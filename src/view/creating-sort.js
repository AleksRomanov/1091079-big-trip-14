import {OFFERS_SORT_OPTIONS} from '../const';

class CreateSortingOffers {

  createViewOptionsElements(typeTitles) {
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
  }

  getElement() {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
                   ${this.createViewOptionsElements(OFFERS_SORT_OPTIONS)}
            </form>`;
  }
}

export {CreateSortingOffers};
