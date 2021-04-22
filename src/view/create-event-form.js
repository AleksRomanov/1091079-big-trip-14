import {DATA_VIEW_PERIOD} from '../const';
import {CITIES, EVENT_TYPES, OFFERS} from '../mocks/data';
import {getFormattedDate, getObjectByKeyInArray} from '../utils';

class CreateEventForm {

  makeStringUppercase([first, ...rest]) {
    return first.toUpperCase() + rest.join('');
  }

  getEventsTypeList(eventsType) {
    return eventsType.map((event) => {
      return `
        <div class="event__type-item">
          <input id="event-type-${event}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${event}">
          <label class="event__type-label  event__type-label--${event}" for="event-type-${event}-1">${this.makeStringUppercase(event)}</label>
        </div>`;
    }).join('');
  }

  getDestinationOptions(cities) {
    return cities.map((city) => {
      return `
        <option value="${city}"></option>
      `;
    }).join('');
  }

  getExtraOffers(eventType, eventOffers) {

    const eventTypeOffersAll = getObjectByKeyInArray(OFFERS, 'type', eventType);
    // console.log(eventTypeOffersAll);

    const isChecked = (offer) => {
      let result = '';
      eventOffers.forEach((event) => {
        if (event.title === offer.title) {
          result = 'checked';
        }
      });
      return result;
    };
    return eventTypeOffersAll.offers.map((offer, index) => {
      return `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${eventType}-${index}" type="checkbox" name="event-offer-luggage" ${isChecked(offer)}>
            <label class="event__offer-label" for="event-offer-${eventType}-${index}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
        </div>`;
    }).join('');
  }

  getEventPhotos(photos) {
    return photos.map((photo) => {
      return `
        <img class="event__photo" src="${photo}" alt="Event photo">
      `;
    }).join('');
  }

  getElement(item) {
    // console.log(item);
    const eventType = item.type;
    const eventOffers = item.offers;
    const eventPhotos = item.destination.photos;
    const eventCity = item.city;
    return `
            <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${this.getEventsTypeList(EVENT_TYPES)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${eventType}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${this.getDestinationOptions(CITIES)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFormattedDate(item.startDate, 'YY[/]MM[/]DD HH:MM')}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormattedDate(item.endDate, 'YY[/]MM[/]DD HH:MM')}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${item.price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${this.getExtraOffers(eventType, eventOffers)}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${item.destination.description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${this.getEventPhotos(eventPhotos)}
                      </div>
                    </div>
                  </section>

                </section>
              </form>
            </li>
    `;
  }
}

export {CreateEventForm};
