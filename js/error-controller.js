import {contentRender, clearMainElement} from './render-module.js';
import ViewError from './error-view.js';

class SplashController {
  static showError(error) {
    clearMainElement();
    const errorView = new ViewError(error);
    contentRender(errorView.element);
  }
}

export default SplashController;
