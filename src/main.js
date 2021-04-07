import {CreateDestination as CreateDestinationComponent, generateEvents} from './view/creating-destination.js';
// import {createEditForm} from './view/creating-edit-form.js';
// import {createFilter} from './view/creating-filter.js';
// import {createSort} from './view/creating-sort.js';
// import {createCreatingForm} from './view/creating-form.js';
// import {createWaypoints} from './view/creating-waypoint.js';
import {render} from './utils';
import {CreatePrice as CreatePriceComponent} from './view/creating-price';
import {CreateMenu as CreateMenuComponent} from './view/creating-menu';

const WAYPOINT_COUNT = 3;

const siteHeader = document.querySelector('.page-header');
// const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
// const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');
// const tripEvents = siteBodyPageMain.querySelector('.trip-events');

const events = generateEvents(WAYPOINT_COUNT);

render(tripMain, new CreateDestinationComponent(events).getElement(), 'afterbegin');

const tripInfo = document.querySelector('.trip-info');

render(tripInfo, new CreatePriceComponent().getElement());

render(tripControlsNavigation, new CreateMenuComponent().getElement());


// render(tripControlsNavigation, createMenu(), 'beforeend');
// render(tripControlsFilters, createFilter(), 'beforeend');
// render(tripEvents, createSort(), 'beforeend');
// render(tripEvents, createEditForm(), 'beforeend');
// render(tripEvents, createCreatingForm(), 'beforeend');
//
//
// for (let i = 0; i < WAYPOINT_COUNT; i++) {
//   render(tripEvents, createWaypoints(), 'beforeend');
// }
