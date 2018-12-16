import {contentRender, clearMainElement} from './render-module.js';
import ViewSplash from './splash-view.js';
import Application from './application.js';
import ErrorController from './error-controller.js';

class SplashController {
  static showSplash(checkStatus) {
    clearMainElement();
    const splash = new ViewSplash();
    contentRender(splash.element);
    splash.start();
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`)
    .then(checkStatus)
    .then((response) => {
      Application.renderIntro();
    })
    .catch((err) => ErrorController.showError(err))
    .then(() => splash.stop());
  }
}

export default SplashController;
