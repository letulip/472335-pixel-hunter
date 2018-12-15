import {contentRender, clearMainElement} from './render-module.js';
import ViewHeader from './header-view.js';

class HeaderController {
  static showHeader(cb, model) {
    clearMainElement();
    const header = new ViewHeader(cb, model);
    contentRender(header.element);
  }
}

export default HeaderController;
