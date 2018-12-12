import {contentRender} from './render-module.js';
import ViewGreeting from './greeting-view.js';
import {stopTimer} from './state.js';

class GreetingController {
  static showGreeting(cb) {
    const greeting = new ViewGreeting(cb);
    contentRender(greeting.element);
    stopTimer();
  }
}

export default GreetingController;
