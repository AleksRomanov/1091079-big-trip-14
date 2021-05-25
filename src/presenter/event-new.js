import Event from '../view/event';
import {remove, render, RenderPosition, replace} from '../utils/render';
import EventForm from '../view/create-event-form';
import {UpdateType, UserAction} from '../const';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventNew {
  constructor(taskListContainer, changeEvent) {
    this._eventListContainer = taskListContainer;
    this._changeEvent = changeEvent;

    this._eventCreateComponent = null;
    this._destroyCallback = null;

    // this._changeMode = changeMode;
    // this._eventComponent = null;
    // this._taskEditComponent = null;
    // this._mode = Mode.DEFAULT;
    // this._handleEditClick = this._handleEditClick.bind(this);
    // this._handleFormClose = this._handleFormClose.bind(this);
    // this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._eventCreateComponent !== null) {
      return;
    }

    this._eventCreateComponent = new EventForm();
    this._eventCreateComponent.setCloseClickHandler(this._closeClickHandler);
    // this._eventCreateComponent.setFormSubmitHandler(this._handleFormSubmit);
    // this._eventCreateComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._eventListContainer, this._eventCreateComponent);

    this._eventCreateComponent.getElement().querySelector('.event__rollup-btn')
      .addEventListener('click', this._closeClickHandler);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _closeClickHandler() {

    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      this.destroy();
    }
  }

  destroy() {
    if (this._eventCreateComponent === null) {
      return;
    }
    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }
    remove(this._eventCreateComponent);
    this._eventCreateComponent = null;
    document.removeEventListener('keydown', this._escKeyDownHandler);
    document.removeEventListener('click', this._closeClickHandler);
  }
}
