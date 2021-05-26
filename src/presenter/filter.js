import FilterView from '../view/creating-filter.js';
import {render, RenderPosition} from '../utils/render.js';
import {FilterTypes, UpdateType} from '../const.js';

export default class Filter {
  constructor(filterContainer, filterModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filterComponent = null;
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
  }

  init() {
    const filters = this._getFilters();
    if (this._filterComponent === null) {
      this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
      this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
    }
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
        type: FilterTypes.IN_PAST,
        name: 'IN_PAST',
      },
      {
        type: FilterTypes.IN_FUTURE,
        name: 'IN_FUTURE',
      },
    ];
  }
}
