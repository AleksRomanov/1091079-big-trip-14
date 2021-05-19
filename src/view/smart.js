import Abstract from './abstract';
import {replace} from '../utils/render';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._state = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._state = {...this._state, update};

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
    replace(newElement, prevElement);
    // parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
