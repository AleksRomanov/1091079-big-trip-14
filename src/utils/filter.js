import {FilterTypes} from '../const';
import {filterFutureEvents, filterPastEvents} from './dates';

export const filter = {
  [FilterTypes.EVERYTHING]: (events) => events.slice(),
  [FilterTypes.IN_FUTURE]: (events) => events.filter(filterFutureEvents),
  [FilterTypes.IN_PAST]: (events) => events.filter(filterPastEvents),
};
