import {render, RenderPosition} from '../utils';
import EventsListView from './creating-waypoint';

const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');


export default class Events {


  mountComponent(state) {
    render(tripEvents, new EventsListView(state).getElement(), RenderPosition.BEFOREEND);
    // this.setEditButtonBehavior(state);
  }
}
