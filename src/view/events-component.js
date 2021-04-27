import {render, RenderPosition} from '../utils';
import EventsListView from './creating-waypoint';
import EventFormView from './create-event-form';

const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');


export default class Events {
  setEditButtonBehavior(state) {
    const btnElements = document.querySelectorAll('.event__rollup-btn');
    btnElements.forEach((item, index) => {
      item.addEventListener('click', () => {
        render(item.parentNode, new EventFormView(state[index]).getElement(), RenderPosition.AFTERBEGIN);
      });
    });
  }

  mountComponent(state) {
    render(tripEvents, new EventsListView(state).getElement(), RenderPosition.BEFOREEND);
    this.setEditButtonBehavior(state);
  }
}
