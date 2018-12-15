import ViewStats from './stats-view.js';
import {contentRender} from './render-module.js';

class StatsController {
  static showStats(model) {
    const stats = new ViewStats(model);
    contentRender(stats.element);
  }
}

export default StatsController;
