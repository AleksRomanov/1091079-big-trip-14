import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import {getFormattedDate, render} from '../utils';
import {editForm} from '../mocks/data';

dayjs.extend(advancedFormat);

const setEditButtonBehavior = () => {

  const btnElements = document.querySelectorAll('.event__rollup-btn');

  btnElements.forEach((item) => {
    item.addEventListener('click', () => {
      // console.log(item.parentNode);
      render(item.parentNode, editForm, 'afterend');
    });
  });
};

class CreateEventsList {

  constructor(state) {

    this._state = state;
  }

  getDuration(startTime, endTime) {
    const diff = dayjs(endTime).diff(startTime);
    return dayjs(diff).format('H[H] MM[M]');
  }

  generateOffers(offers) {

    let result = '';

    offers.forEach((item) => {
      result += `<li class="event__offer">
                <span class="event__offer-title">${item['title']}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${item['price']}</span>
              </li>`;
    });
    return result;
  }

  getButtonHeader(favoriteStatus) {
    if (favoriteStatus) {
      return `
        <button class="event__favorite-btn event__favorite-btn--active" type="button">`;
    }
    return `
        <button class="event__favorite-btn event__favorite-btn" type="button">`;
  }

  generateEvents() {
    let result = ' ';

    this._state.forEach((item) => {

      result += `
        <li class="trip-events__item">
          <div class="event">
            <time class="event__date" datetime="${getFormattedDate(item.startDate, 'YYYY-MM-DD')}">${getFormattedDate(item.startDate, 'MMM DD')}</time>
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${item.type}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${item.type} ${item.city}</h3>
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="${getFormattedDate(item.startDate, 'HH:MM')}">${getFormattedDate(item.startDate, 'HH:MM')}</time>
                &mdash;
                <time class="event__end-time" datetime="${getFormattedDate(item.endDate, 'HH:MM')}">${getFormattedDate(item.endDate, 'HH:MM')}</time>
              </p>
              <p class="event__duration">${this.getDuration(item.startDate, item.endDate)}</p>
            </div>
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${item.price}</span>
            </p>
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${this.generateOffers(item.offers)}
            </ul>
            ${this.getButtonHeader(item.favorite)}
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
              </svg>
            </button>

            <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
             </button>

          </div>
        </li>`;

    });

    return result;
  }

  generateEventsList() {
    return `
      <ul class="trip-events__list">

        ${this.generateEvents()};
      </ul>`;
  }
}

export {CreateEventsList, setEditButtonBehavior};
