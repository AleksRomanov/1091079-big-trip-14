import {remove, render} from '../utils/render';
import EventForm from '../view/event-form';
import {UpdateType, UserAction} from '../const';
import {StateConditions} from './event';

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
    this._eventCreateComponent.setFormSubmitHandler(this._handleFormSubmit);
    document.addEventListener('keydown', this._escKeyDownHandler);

    render(this._eventListContainer, this._eventCreateComponent);
  }

  setViewState(state) {
    const resetFormState = () => {
      this._eventCreateComponent.updateState({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    switch (state) {
      // case StateConditions.SAVING:
      //   this._eventEditComponent.updateState({
      //     isDisabled: true,
      //     isSaving: true,
      //   });
      //   break;
      // case StateConditions.DELETING:
      //   this._eventEditComponent.updateState({
      //     isDisabled: true,
      //     isDeleting: true,
      //   });
      //   break;
      case StateConditions.ABORTING:
        // console.log(this._eventCreateComponent.getElement());
        console.log('abort');
        this._eventCreateComponent.getElement().shake(resetFormState);
        break;
    }
  }

  _handleFormSubmit(update) {
    this._changeEvent(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      update,
    );

    this.destroy();
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
