import Observer from '../utils/observer.js';
import {FilterTypes} from '../const.js';

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterTypes.EVERYTHING;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
