import CheckpointView from '../view/checkpoint';
import {render, RenderPosition} from '../utils/render';

export default class Point {
  constructor(taskListContainer) {
    this._taskListContainer = taskListContainer;
    // this._changeData = changeData;
    // this._changeMode = changeMode;

    this._taskComponent = null;
    this._taskEditComponent = null;
    // this._mode = Mode.DEFAULT;

    // this._handleEditClick = this._handleEditClick.bind(this);
    // this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    // this._handleArchiveClick = this._handleArchiveClick.bind(this);
    // this._handleFormSubmit = this._handleFormSubmit.bind(this);
    // this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    // const prevTaskComponent = this._taskComponent;
    // const prevTaskEditComponent = this._taskEditComponent;

    this._eventComponent = new CheckpointView(this._event);

    // console.log(this._taskListContainer);

    // const eventsContainer = document.querySelector('.trip-events__list');
    // render(eventsContainer, this._eventComponent, RenderPosition.BEFOREEND);
    // console.log(this._eventComponent);


    render(this._taskListContainer, this._eventComponent, RenderPosition.BEFOREEND);

    // this._taskComponent = new TaskView(task);
    // this._taskEditComponent = new TaskEditView(task);
    //
    // this._taskComponent.setEditClickHandler(this._handleEditClick);
    // this._taskComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    // this._taskComponent.setArchiveClickHandler(this._handleArchiveClick);
    // this._taskEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    //
    // if (prevTaskComponent === null || prevTaskEditComponent === null) {
    //   render(this._taskListContainer, this._taskComponent, RenderPosition.BEFOREEND);
    //   return;
    // }
    //
    // if (this._mode === Mode.DEFAULT) {
    //   replace(this._taskComponent, prevTaskComponent);
    // }
    //
    // if (this._mode === Mode.EDITING) {
    //   replace(this._taskEditComponent, prevTaskEditComponent);
    // }
    //
    // remove(prevTaskComponent);
    // remove(prevTaskEditComponent);
  }
}

