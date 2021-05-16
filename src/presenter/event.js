import Event from '../view/event';
import {remove, render, RenderPosition, replace} from '../utils/render';
import EventForm from '../view/create-event-form';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(taskListContainer, changeData, changeMode) {
    this._eventListContainer = taskListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._eventComponent = null;
    this._taskEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormClose = this._handleFormClose.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;
    const prevTaskComponent = this._eventComponent;
    const prevTaskEditComponent = this._editFormComponent;

    this._eventComponent = new Event(this._event);
    this._editFormComponent = new EventForm(this._event);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._editFormComponent.setCloseClickHandler(this._handleFormClose);
    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this._eventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevTaskComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._taskEditComponent, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  _handleEditClick() {
    this._replaceEventToForm();
  }

  _handleFormClose() {
    this._replaceFormToEvent();
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  _replaceEventToForm() {
    replace(this._editFormComponent, this._eventComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToEvent() {
    replace(this._eventComponent, this._editFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      this._replaceFormToEvent();
    }
  }

  _handleFavoriteClick() {
    this._changeData({...this._event, favorite: !this._event.favorite});
  }
}
