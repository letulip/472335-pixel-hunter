import {contentRender, clearMainElement} from './render-module.js';
import ViewHeader from './header-view.js';

class HeaderController {
  static showHeader(cb, lives) {
    clearMainElement();
    const header = new ViewHeader(cb, lives);
    contentRender(header.element);
    return header.element;
  }
}

export default HeaderController;
