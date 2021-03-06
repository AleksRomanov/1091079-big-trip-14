import {remove, render} from '../utils/render';
import EventForm from '../view/event-form';
import {UpdateType, UserAction} from '../const';

export default class EventNew {
  constructor(taskListContainer, changeEvent, dataModel) {
    this._eventListContainer = taskListContainer;
    this._changeEvent = changeEvent;
    this._dataModel = dataModel;

    this._eventCreateComponent = null;
    this._destroyCallback = null;
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init(callbacks) {
    this._destroyCallback = callbacks;
    if (this._eventCreateComponent !== null) {
      return;
    }
    this._eventCreateComponent = new EventForm(undefined, this._dataModel);
    this._eventCreateComponent.setCloseClickHandler(this._closeClickHandler);
    this._eventCreateComponent.setDeleteClickHandler(this._closeClickHandler);
    this._eventCreateComponent.setFormSubmitHandler(this._handleFormSubmit);
    document.addEventListener('keydown', this._escKeyDownHandler);
    render(this._eventListContainer, this._eventCreateComponent);
  }

  setAborting() {
    const resetFormState = () => {
      this._eventCreateComponent.updateState({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._eventCreateComponent.shake(resetFormState);
  }

  _handleFormSubmit(update) {
    this._changeEvent(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      update,
    );
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
    document.removeEventListener('submit', this._handleFormSubmit);
  }
}
