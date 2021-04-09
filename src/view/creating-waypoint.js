import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);


class CreateEventsList {

  constructor(state) {

    this._state = state;
  }

  getShortDate(date, format){
    return dayjs(date).format(format);
  }

  getDuration(startTime, endTime){
    const diff = dayjs(endTime).diff(startTime);
    return dayjs(diff).format('H[H] MM[M]');
  }

  generateEvents() {
    let result = ' ';

    this._state.forEach((item) => {
      result += `
        <li class="trip-events__item">
          <div class="event">
            <time class="event__date" datetime="${this.getShortDate(item.startDate, 'YYYY-MM-DD')}">${this.getShortDate(item.startDate, 'MMM DD')}</time>
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${item.type}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${item.type} ${item.city}</h3>
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="${this.getShortDate(item.startDate, 'HH:MM')}">${this.getShortDate(item.startDate, 'HH:MM')}</time>
                &mdash;
                <time class="event__end-time" datetime="${this.getShortDate(item.endDate, 'HH:MM')}">${this.getShortDate(item.endDate, 'HH:MM')}</time>
              </p>
              <p class="event__duration">${this.getDuration(item.startDate, item.endDate)}</p>
            </div>
<!--            <p class="event__price">-->
<!--              &euro;&nbsp;<span class="event__price-value">20</span>-->
<!--            </p>-->
<!--            <h4 class="visually-hidden">Offers:</h4>-->
<!--            <ul class="event__selected-offers">-->
<!--              <li class="event__offer">-->
<!--                <span class="event__offer-title">Order Uber</span>-->
<!--                &plus;&euro;&nbsp;-->
<!--                <span class="event__offer-price">20</span>-->
<!--              </li>-->
<!--            </ul>-->
<!--            <button class="event__favorite-btn event__favorite-btn&#45;&#45;active" type="button">-->
<!--              <span class="visually-hidden">Add to favorite</span>-->
<!--              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">-->
<!--                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>-->
<!--              </svg>-->
<!--            </button>-->
<!--            <button class="event__rollup-btn" type="button">-->
<!--              <span class="visually-hidden">Open event</span>-->
<!--            </button>-->
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
};

export {CreateEventsList};
