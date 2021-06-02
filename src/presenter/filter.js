import FilterView from '../view/filters.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {FilterTypes, UpdateType} from '../const.js';

export default class Filter {
  constructor(filterContainer, filterModel, eventsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;
    this._filterComponent = null;
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
  }

  init() {
    if (this._filterComponent !== null) {
      remove(this._filterComponent);
    }

    this._filterComponent = new FilterView(this._getFilters(), this._eventsModel.getEvents());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    return [
      {
        type: FilterTypes.EVERYTHING,
        name: 'EVERYTHING',
      },
      {
        type: FilterTypes.IN_FUTURE,
        name: 'FUTURE',
      },
      {
        type: FilterTypes.IN_PAST,
        name: 'PAST',
      },
    ];
  }
}
