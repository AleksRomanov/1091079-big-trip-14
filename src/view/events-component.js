import {render} from '../utils';
import {CreateSortingOffers as CreateSortingOffersComponent} from './creating-sort';
import {CreateEventsList as CreateEventsListComponent} from './creating-waypoint';
import {addForm, editForm} from '../mocks/data';

const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');


class Events {
  setEditButtonBehavior() {
    const btnElements = document.querySelectorAll('.event__rollup-btn');
    btnElements.forEach((item) => {
      item.addEventListener('click', () => {
        render(item.parentNode, editForm, 'afterend');
      });
    });
  }
  mountComponent(state) {
    render(tripEvents, new CreateEventsListComponent().generateEventsList(state), 'beforeend');
    this.setEditButtonBehavior();
  }
}

export {Events};
