import {contentRender, clearMainElement} from './render-module.js';
import ViewIntro from './intro-view.js';

class IntroController {
  static showIntro(cb) {
    clearMainElement();
    const intro = new ViewIntro(cb);
    contentRender(intro.element);
  }
}

export default IntroController;
