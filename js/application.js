import ViewIntro from './intro.js';
import {contentRender, clearMainElement} from './render-module.js';
import ViewGreeting from './greeting.js';
import ViewRules from './rules.js';
import ViewHeader from './header.js';
import {INITIAL_STATE_WITH_QUESTIONS, addPlayerName, stopTimer} from './state.js';
import renderGameState from './game.js';
import ViewStats from './stats.js';

class Application {
  static showWelcome() {
    const intro = new ViewIntro(Application.renderGreeting);
    contentRender(intro.element);
  }

  static renderGameCB(state, name) {
    renderGameState(addPlayerName(state, name), Application.renderGreeting, Application.renderStatsCB);
  }

  static renderStatsCB(state) {
    const stats = new ViewStats(state);
    contentRender(stats.element);
  }

  static renderRules() {
    const rules = new ViewRules(INITIAL_STATE_WITH_QUESTIONS, Application.renderGameCB);
    Application.renderHeader();
    contentRender(rules.element);
  }

  static renderHeader() {
    const header = new ViewHeader(false, Application.renderGreeting);
    clearMainElement();
    contentRender(header.element);
  }

  static renderGreeting() {
    const greeting = new ViewGreeting(Application.renderRules);
    clearMainElement();
    contentRender(greeting.element);
    stopTimer();
  }
}

export default Application;
