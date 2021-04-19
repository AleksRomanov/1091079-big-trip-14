import {render} from '../utils';
import {CreateEventsList as CreateEventsListComponent} from './creating-waypoint';
import {CreateEventForm} from './create-event-form';

const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');


class Events {
  setEditButtonBehavior(state) {
    const btnElements = document.querySelectorAll('.event__rollup-btn');
    btnElements.forEach((item, index) => {
      item.addEventListener('click', () => {
        render(item.parentNode, new CreateEventForm().getElement(state[index]), 'afterend');
      });
    });
  }
  mountComponent(state) {
    render(tripEvents, new CreateEventsListComponent().generateEventsList(state), 'beforeend');
    this.setEditButtonBehavior(state);
  }
}

export {Events};
