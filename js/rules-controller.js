import {contentRender} from './render-module.js';
import ViewRules from './rules-view.js';

class RulesController {
  static showRules(state, cb) {
    const rules = new ViewRules(state, cb);
    contentRender(rules.element);
  }
}

export default RulesController;
