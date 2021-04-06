import {CreateDestination as CreateDestinationComponent, generateEvents} from './view/creating-destination.js';
import {createEditForm} from './view/creating-edit-form.js';
import {createMenu} from './view/creating-menu.js';
import {createPrice} from './view/creating-price.js';
import {createFilter} from './view/creating-filter.js';
import {createSort} from './view/creating-sort.js';
import {createCreatingForm} from './view/creating-form.js';
import {createWaypoints} from './view/creating-waypoint.js';
import {render} from './utils';

const WAYPOINT_COUNT = 3;

const siteHeader = document.querySelector('.page-header');
const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');

const events = generateEvents(WAYPOINT_COUNT);

// render(tripMain, createDestination(), 'afterbegin');
render(tripMain, new CreateDestinationComponent(events).getElement(), 'afterbegin');
// render(tripControlsNavigation, createMenu(), 'beforeend');
// render(tripMain, createPrice(), 'afterbegin');
// render(tripControlsFilters, createFilter(), 'beforeend');
// render(tripEvents, createSort(), 'beforeend');
// render(tripEvents, createEditForm(), 'beforeend');
// render(tripEvents, createCreatingForm(), 'beforeend');
//
//
// for (let i = 0; i < WAYPOINT_COUNT; i++) {
//   render(tripEvents, createWaypoints(), 'beforeend');
// }
