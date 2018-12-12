import IntroController from './intro-controller.js';
import {contentRender, clearMainElement} from './render-module.js';
import GreetingController from './greeting-controller.js';
import RulesController from './rules-controller.js';
import ViewHeader from './header.js';
import {INITIAL_STATE_WITH_QUESTIONS, addPlayerName} from './state.js';
import renderGameState from './game.js';
import ViewStats from './stats.js';

class Application {
  static showWelcome() {
    IntroController.showIntro(Application.renderGreeting);
  }

  static renderGameCB(state, name) {
    renderGameState(addPlayerName(state, name), Application.renderGreeting, Application.renderStatsCB);
  }

  static renderStatsCB(state) {
    const stats = new ViewStats(state);
    contentRender(stats.element);
  }

  static renderRules() {
    Application.renderHeader();
    RulesController.showRules(INITIAL_STATE_WITH_QUESTIONS, Application.renderGameCB);
  }

  static renderHeader() {
    const header = new ViewHeader(false, Application.renderGreeting);
    clearMainElement();
    contentRender(header.element);
  }

  static renderGreeting() {
    clearMainElement();
    GreetingController.showGreeting(Application.renderRules);
  }
}

export default Application;
