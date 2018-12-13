import IntroController from './intro-controller.js';
import {contentRender, clearMainElement} from './render-module.js';
import GreetingController from './greeting-controller.js';
import RulesController from './rules-controller.js';
import HeaderController from './header-controller.js';
import {INITIAL_STATE_WITH_QUESTIONS, addPlayerName} from './state.js';
import GameModel from './game-model.js';
import ViewStats from './stats.js';

class Application {
  static showWelcome() {
    IntroController.showIntro(Application.renderGreeting);
  }

  static renderGameCB(state, name) {
    GameModel.renderGameState(addPlayerName(state, name), Application.renderGreeting, Application.renderStatsCB);
  }

  static renderStatsCB(state) {
    const stats = new ViewStats(state);
    contentRender(stats.element);
  }

  static renderRules() {
    Application.renderHeader(false);
    RulesController.showRules(INITIAL_STATE_WITH_QUESTIONS, Application.renderGameCB);
  }

  static renderHeader(state) {
    clearMainElement();
    HeaderController.showHeader(Application.renderGreeting, state);
  }

  static renderGreeting() {
    clearMainElement();
    GreetingController.showGreeting(Application.renderRules);
  }
}

export default Application;
