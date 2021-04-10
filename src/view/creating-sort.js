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
<!--              <span class="trip-sort__item  trip-sort__item&#45;&#45;day">DAY</span>-->
                   ${this.createViewOptionsElements(this._typeTitles)}
<!--                 <span class="trip-sort__item  trip-sort__item&#45;&#45;offers">Offers</span>-->
            </form>`;
  }
}
//
// <form className="trip-events__trip-sort  trip-sort" action="#" method="get">
//   <div className="trip-sort__item  trip-sort__item--day">
//     <input id="sort-day" className="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">
//       <label className="trip-sort__btn" htmlFor="sort-day">Day</label>
//   </div>
//
//   <div className="trip-sort__item  trip-sort__item--event">
//     <input id="sort-event" className="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
//       <label className="trip-sort__btn" htmlFor="sort-event">Event</label>
//   </div>
//
//   <div className="trip-sort__item  trip-sort__item--time">
//     <input id="sort-time" className="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
//       <label className="trip-sort__btn" htmlFor="sort-time">Time</label>
//   </div>
//
//   <div className="trip-sort__item  trip-sort__item--price">
//     <input id="sort-price" className="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>
//       <label className="trip-sort__btn" htmlFor="sort-price">Price</label>
//   </div>
//
//   <div className="trip-sort__item  trip-sort__item--offer">
//     <input id="sort-offer" className="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
//       <label className="trip-sort__btn" htmlFor="sort-offer">Offers</label>
//   </div>
// </form>


export {CreateSortingOffers};
