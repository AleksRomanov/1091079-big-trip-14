import Abstract from './abstract';
import {replace} from '../utils/render';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._state = {};
  }

  updateState(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._state = {...this._state, ...update};

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    // const parent = prevElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    // console.log(this.removeElement);x
    // console.log(prevElement);

    replace(newElement, prevElement);
    // parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
