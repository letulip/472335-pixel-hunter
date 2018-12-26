import {bodyAppendElement} from './render-module.js';
import ViewError from './error-view.js';

class ErrorController {
  static showError(error) {
    const errorView = new ViewError(error);
    bodyAppendElement(errorView.element);
  }
}

export default ErrorController;
