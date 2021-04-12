// import {OFFERS_SORT_OPTIONS} from '../mocks/data';

import {render} from '../utils';
// import {CreateEventsList as CreateEventsListComponent} from './creating-waypoint';
import {CreateTripInfo as CreateTripInfoComponent} from './create-trip-info';
import {CreateMenu as CreateMenuComponent} from './creating-menu';
import {CreateFilterTime as createFilterComponent} from './creating-filter';
// import {CreateSortingOffers as CreateSortingOffersComponent} from './creating-sort';
// import {editForm} from '../mocks/data';
import {Events as EventsComponent} from './events-component';
import {addForm} from '../mocks/data';

const siteHeader = document.querySelector('.page-header');

const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');
const addEventButton = document.querySelector('.trip-main__event-add-btn');
const destinationBlock = document.querySelector('.trip-events__list');

class AppComponent {
  constructor(state) {
    this._state = state;
  }

  setAddEventButtonBehavior (button) {
    button.addEventListener('click', () => {
      render(destinationBlock, addForm, 'afterbegin');
    });
  }

  renderComponents() {
    render(tripMain, new CreateTripInfoComponent(this._state).getElement(), 'afterbegin');
    render(tripControlsNavigation, new CreateMenuComponent().getElement());
    render(tripControlsFilters, new createFilterComponent().getElement());
    new EventsComponent(this._state).mountComponent();
    this.setAddEventButtonBehavior(addEventButton);
  }
}

export {AppComponent};
