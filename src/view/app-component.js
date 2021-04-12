// import {OFFERS_SORT_OPTIONS} from '../mocks/data';

import {render} from '../utils';
// import {CreateEventsList as CreateEventsListComponent} from './creating-waypoint';
import {CreateTripInfo as CreateTripInfoComponent} from './create-trip-info';
import {CreateMenu as CreateMenuComponent} from './creating-menu';
import {CreateFilterTime as createFilterComponent} from './creating-filter';
// import {CreateSortingOffers as CreateSortingOffersComponent} from './creating-sort';
// import {editForm} from '../mocks/data';
import {Events as EventsComponent} from './events-component';

const siteHeader = document.querySelector('.page-header');

const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');

class AppComponent {
  constructor(props) {
    this._state = props;
  }

  renderComponents() {
    render(tripMain, new CreateTripInfoComponent(this._state).getElement(), 'afterbegin');
    render(tripControlsNavigation, new CreateMenuComponent().getElement());
    render(tripControlsFilters, new createFilterComponent().getElement());

    new EventsComponent(this._state).mountComponent();

  }
}

export {AppComponent};
