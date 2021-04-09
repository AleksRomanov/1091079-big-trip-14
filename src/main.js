import {CreateEventsState} from './view/creating-destination';

// import {CreatePrice as CreatePriceComponent} from './view/creating-price';
// import {CreateMenu as CreateMenuComponent} from './view/creating-menu';
// import {CreateFilterTime as createFilterComponent} from './view/creating-filter';
// import {CreateSortingOffers as CreateSortingOffersComponent} from './view/creating-sort';
// import {createCreatingForm} from './view/creating-form.js';
// import {createEditForm} from './view/creating-edit-form.js';
import {getRandomNumber, render} from './utils';
import {CreateEventsList as CreateEventsListComponent} from './view/creating-waypoint';

const WAYPOINT_COUNT = 29;
// const PAST_EVENTS_COUNT = getRandomNumber(9, 10);
// const PAST_EVENTS_COUNT = 0;

const siteHeader = document.querySelector('.page-header');
const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');
const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');


const props = [WAYPOINT_COUNT];

const state = new CreateEventsState(props).generateEvents();
// console.log(state + ' state');
//
// render(tripMain, new CreateDestinationComponent(events).getElement(), 'afterbegin');
// const tripInfo = document.querySelector('.trip-info');
// render(tripInfo, new CreatePriceComponent().getElement());
// render(tripControlsNavigation, new CreateMenuComponent().getElement());
// render(tripControlsFilters, new createFilterComponent().getElement());
// render(tripEvents, new CreateSortingOffersComponent().getElement());
// render(tripEvents, new CreateSortingOffersComponent().getElement());
// console.log(state);
render(tripEvents, new CreateEventsListComponent(state).generateEventsList(), 'beforeend');

// const tripInfo = document.querySelector('.trip-info');
// render(tripControlsFilters, new createFilterComponent().getElement());

// render(tripEvents, createEditForm(), 'beforeend');


//
// for (let i = 0; i < WAYPOINT_COUNT; i++) {
//   render(tripEvents, createWaypoints(), 'beforeend');
// }

