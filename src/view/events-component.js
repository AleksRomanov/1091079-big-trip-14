import {render} from '../utils';
import {CreateSortingOffers as CreateSortingOffersComponent} from './creating-sort';
import {CreateEventsList as CreateEventsListComponent} from './creating-waypoint';
import {editForm} from '../mocks/data';


const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');


class Events {
  constructor(props) {
    this._state = props;
  }

  setEditButtonBehavior() {
    const btnElements = document.querySelectorAll('.event__rollup-btn');
    btnElements.forEach((item) => {
      item.addEventListener('click', () => {
        render(item.parentNode, editForm, 'afterend');
      });
    });
  }

  mountComponent() {
    render(tripEvents, new CreateSortingOffersComponent().getElement());
    render(tripEvents, new CreateEventsListComponent(this._state).generateEventsList(), 'beforeend');
    this.setEditButtonBehavior();
  }
}

export {Events};
