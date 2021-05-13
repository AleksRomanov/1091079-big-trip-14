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

    // this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    // this._handleArchiveClick = this._handleArchiveClick.bind(this);
    // this._handleFormSubmit = this._handleFormSubmit.bind(this);
    // this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;
    // console.log(this._event);

    const prevTaskComponent = this._eventComponent;
    const prevTaskEditComponent = this._taskEditComponent;

    this._eventComponent = new Event(this._event);
    this._editFormComponent = new EventForm(this._event);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    // this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    // this._eventComponent.setArchiveClickHandler(this._handleArchiveClick);
    // this._taskEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    //
    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this._eventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }
    //
    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevTaskComponent);
    }
    //
    if (this._mode === Mode.EDITING) {
      replace(this._taskEditComponent, prevTaskEditComponent);
    }
    //
    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    console.log(this);
    replace(this._editFormComponent, this._eventComponent);
    // document.addEventListener('keydown', this._escKeyDownHandler);
    // this._changeMode();
    // this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._taskEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  // _setEditButtonBehavior(event) {
  //   const btnElement = event.querySelector('.event__rollup-btn');
  //   btnElement.addEventListener('click', () => {
  //     const editForm = document.querySelector('.event--edit');
  //     if (!editForm) {
  //       this._renderForm(event);
  //     } else {
  //       this._closeOpenedForm(editForm);
  //       // this._renderForm(event);
  //     }
  //   });
  // }
}
