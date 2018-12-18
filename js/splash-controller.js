import {contentRender, clearMainElement} from './render-module.js';
import ViewSplash from './splash-view.js';
import Application from './application.js';
import ErrorController from './error-controller.js';
import Loader from './loader.js';

let gameQuestions;

class SplashController {
  static showSplash() {
    clearMainElement();
    const splash = new ViewSplash();
    contentRender(splash.element);
    splash.start();
    Loader.loadData()
    .then((data) => {
      gameQuestions = data;
    })
    .then(() => {
      Application.renderIntro();
    })
    .catch((err) => ErrorController.showError(err))
    .then(() => splash.stop());
  }

  static getQuestions() {
    return gameQuestions;
  }
}

export default SplashController;
