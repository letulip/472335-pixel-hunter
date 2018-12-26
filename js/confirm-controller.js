import {bodyAppendElement} from './render-module.js';
import ViewConfirm from './confirm-view.js';

class ConfirmController {
  static showConfirm(cb) {
    const confirmView = new ViewConfirm(cb);
    bodyAppendElement(confirmView.element);
  }
}

export default ConfirmController;
