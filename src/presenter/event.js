import Event from '../view/event';
import {remove, render, RenderPosition, replace} from '../utils/render';
import EventForm from '../view/event-form';
import {UpdateType, UserAction} from '../const';
import {isDatesEqual} from '../utils/dates';
import {isOffersEqual, isPriceEqual} from '../utils/common';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export const StateConditions = {
  SAVING: 'SAVING',
  DELETING: 'DELETE_EVENT',
  ABORTING: 'ABORTING',
};

export default class Point {
  constructor(taskListContainer, changeEvent, changeMode, dataModel, newEvent) {
    this._dataModel = dataModel;
    this._newEvent = newEvent;
    this._eventListContainer = taskListContainer;
    this._changeEvent = changeEvent;
    this._changeMode = changeMode;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormClose = this._handleFormClose.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(event) {
    this._event = event;
    const prevTaskComponent = this._eventComponent;
    const prevTaskEditComponent = this._eventEditComponent;

    this._eventComponent = new Event(this._event);
    this._eventEditComponent = new EventForm(this._event, this._dataModel);
    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setCloseClickHandler(this._handleFormClose);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this._eventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevTaskComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  setViewState(state) {
    const resetFormState = () => {
      this._eventEditComponent.updateState({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    switch (state) {
      case StateConditions.SAVING:
        this._eventEditComponent.updateState({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case StateConditions.DELETING:
        this._eventEditComponent.updateState({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case StateConditions.ABORTING:
        this._eventEditComponent.shake(resetFormState);
        break;
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  _handleFormSubmit(update) {

    const isMinorUpdate = !isDatesEqual(this._event.startDate, update.startDate) ||
      !isDatesEqual(this._event.endDate, update.endDate) ||
      isOffersEqual(this._event.offers, update.offers) ||
      !isPriceEqual(this._event.price, update.price);
    this._changeEvent(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
  }

  _handleDeleteClick(event) {
    this._changeEvent(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  }

  _handleEditClick() {
    this._replaceEventToForm();
    this._newEvent.destroy();
  }

  _handleFormClose() {
    this._eventEditComponent.reset(this._event);
    this._replaceFormToEvent();
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  _replaceEventToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._event);
      this._replaceFormToEvent();
    }
  }

  _handleFavoriteClick() {
    this._changeEvent(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      {...this._event, favorite: !this._event.favorite},
    );
  }
}
