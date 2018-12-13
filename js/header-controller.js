import {contentRender, clearMainElement} from './render-module.js';
import ViewHeader from './header-view.js';

class HeaderController {
  static showHeader(cb, state) {
    clearMainElement();
    const header = new ViewHeader(cb, state);
    contentRender(header.element);
  }
}

export default HeaderController;
