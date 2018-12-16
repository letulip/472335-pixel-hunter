import {contentRender, clearMainElement} from './render-module.js';
import ViewSplash from './splash-view.js';
import Application from './application.js';
import ErrorController from './error-controller.js';

let gameQuestions;

class SplashController {
  static showSplash(checkStatus) {
    clearMainElement();
    const splash = new ViewSplash();
    contentRender(splash.element);
    splash.start();
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`)
    .then(checkStatus)
    .then((response) => response.json())
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
