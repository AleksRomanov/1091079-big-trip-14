import {createElement, render, RenderPosition} from '../utils';
import EventsListView, {generateEvents} from './creating-waypoint';
import EventFormView from './create-event-form';

const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');


export default class Events {


  mountComponent(state) {
    render(tripEvents, new EventsListView(state).getElement(), RenderPosition.BEFOREEND);
    // this.setEditButtonBehavior(state);
  }
}
