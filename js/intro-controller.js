import {contentRender, clearMainElement} from './render-module.js';
import ViewIntro from './intro-view.js';
import Application from './application.js';
import ErrorController from './error-controller.js';
import Loader from './loader.js';

let gameQuestions;

class IntroController {
  static showIntro(cb) {
    clearMainElement();
    const intro = new ViewIntro(cb);
    contentRender(intro.element);

    intro.start();
    Loader.loadData()
    .then((data) => {
      gameQuestions = data;
    })
    .then(() => {
      Application.renderGreeting();
    })
    .catch((err) => {
      ErrorController.showError(err);
    })
    .then(() => {
      intro.stop();
    });
  }

  static getQuestions() {
    return gameQuestions;
  }
}

export default IntroController;
