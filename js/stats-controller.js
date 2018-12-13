import ViewStats from './stats-view.js';
import {contentRender} from './render-module.js';

class StatsController {
  static showStats(state) {
    const stats = new ViewStats(state);
    contentRender(stats.element);
  }
}

export default StatsController;
