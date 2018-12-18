import {contentRender, clearMainElement} from './render-module.js';
import ViewError from './error-view.js';

class ErrorController {
  static showError(error) {
    clearMainElement();
    const errorView = new ViewError(error);
    contentRender(errorView.element);
  }
}

export default ErrorController;
