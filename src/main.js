import {createEditForm} from './view/creating-edit-form.js';
import {createMenu} from './view/creating-menu.js';
import {createDestination} from './view/creating-destination.js';
import {createPrice} from './view/creating-price.js';
import {createFilter} from './view/creating-filter.js';
import {createSort} from './view/creating-sort.js';
import {createCreatingForm} from './view/creating-form.js';
import {createWaypoints} from './view/creating-waypoint.js';

const WAYPOINT_COUNT = 3;

const siteHeader = document.querySelector('.page-header');
const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripControlsNavigation, createMenu(), 'beforeend');
render(tripMain, createDestination(), 'afterbegin');
render(tripMain, createPrice(), 'afterbegin');
render(tripControlsFilters, createFilter(), 'beforeend');
render(tripEvents, createSort(), 'beforeend');
render(tripEvents, createEditForm(), 'beforeend');
render(tripEvents, createCreatingForm(), 'beforeend');


for (let i = 0; i < WAYPOINT_COUNT; i++) {
  render(tripEvents, createWaypoints(), 'beforeend');
}
