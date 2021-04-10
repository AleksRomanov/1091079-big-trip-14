import {CreateEventsState} from './view/creating-destination';

import {CreateMenu as CreateMenuComponent} from './view/creating-menu';
import {CreateFilterTime as createFilterComponent} from './view/creating-filter';
import {CreateSortingOffers as CreateSortingOffersComponent} from './view/creating-sort';
import {render, setAddEventButtonBehavior} from './utils';
import {CreateEventsList as CreateEventsListComponent, setEditButtonBehavior} from './view/creating-waypoint';
import {CreateTripInfo as CreateTripInfoComponent} from './view/create-trip-info';

const WAYPOINT_COUNT = 29;

const siteHeader = document.querySelector('.page-header');
const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');
const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');


const props = [WAYPOINT_COUNT];

const state = new CreateEventsState(props).generateEvents();
render(tripMain, new CreateTripInfoComponent(state).getElement(), 'afterbegin');
render(tripControlsNavigation, new CreateMenuComponent().getElement());
render(tripControlsFilters, new createFilterComponent().getElement());
render(tripEvents, new CreateSortingOffersComponent().getElement());
render(tripEvents, new CreateEventsListComponent(state).generateEventsList(), 'beforeend');
setEditButtonBehavior();

const addEventButton = document.querySelector('.trip-main__event-add-btn');
setAddEventButtonBehavior(addEventButton);

