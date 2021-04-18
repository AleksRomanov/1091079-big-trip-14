import dayjs from 'dayjs';
import {getFormattedDate} from '../utils';

class CreateEventsList {

  getDuration(startTime, endTime) {
    const diff = dayjs(endTime).diff(startTime);
    return dayjs(diff).format('H[H] MM[M]');
  }

  generateOffers(offers) {
    return offers.map((item) => {
      return `<li class="event__offer">
                <span class="event__offer-title">${item['title']}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${item['price']}</span>
              </li>`;
    }).join('');
  }

  isFavorite(favoriteStatus) {
    return favoriteStatus ? 'event__favorite-btn--active' : 'event__favorite-btn';
  }

  generateEvents(state) {
    return state.map((item) => {
      const startDate = item.startDate;
      const endDate = item.endDate;
      const typeEvent = item.type;
      const city = item.city;
      const price = item.price;
      const offers = item.offers;
      const favorite = item.favorite;

      return `
        <li class="trip-events__item">
          <div class="event">
            <time class="event__date" datetime="${getFormattedDate(startDate, 'YYYY-MM-DD')}">${getFormattedDate(startDate, 'MMM DD')}</time>
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${typeEvent}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${typeEvent} ${city}</h3>
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="${getFormattedDate(startDate, 'HH:MM')}">${getFormattedDate(startDate, 'HH:MM')}</time>
                &mdash;
                <time class="event__end-time" datetime="${getFormattedDate(endDate, 'HH:MM')}">${getFormattedDate(endDate, 'HH:MM')}</time>
              </p>
              <p class="event__duration">${this.getDuration(startDate, endDate)}</p>
            </div>
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${price}</span>
            </p>
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${this.generateOffers(offers)}
            </ul>
            <button class="event__favorite-btn ${this.isFavorite(favorite)}" type="button">
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

    }).join('');
  }

  generateEventsList(state) {
    return `
      <ul class="trip-events__list">
        ${this.generateEvents(state)};
      </ul>`;
  }
}

export {CreateEventsList};
