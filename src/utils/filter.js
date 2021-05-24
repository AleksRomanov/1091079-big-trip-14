import {FilterTypes} from '../const';
import {filterFutureEvents, filterPastEvents} from './dates';

export const filter = {
  [FilterTypes.EVERYTHING]: (events) => events.slice(),
  [FilterTypes.IN_FUTURE]: (events) => events.filter(filterFutureEvents),
  [FilterTypes.IN_PAST]: (events) => events.filter(filterPastEvents),
};


// switch (filterType) {
//   case FilterTypes.IN_FUTURE:
//     this._events = this._sourcedEvents.filter(filterFutureEvents);
//     break;
//   case FilterTypes.IN_PAST:
//     this._events = this._sourcedEvents.filter(filterPastEvents);
//     break;
//   default:
//     this._events = this._sourcedEvents.slice();
// }
