import {contentRender} from './render-module.js';
import ViewRules from './rules-view.js';

class RulesController {
  static showRules(cb) {
    const rules = new ViewRules(cb);
    contentRender(rules.element);
  }
}

export default RulesController;
