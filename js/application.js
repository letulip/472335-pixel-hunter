import IntroController from './intro-controller.js';
import GreetingController from './greeting-controller.js';
import RulesController from './rules-controller.js';
import HeaderController from './header-controller.js';
import GameModel from './game-model.js';
import GameController from './game-controller.js';
import StatsController from './stats-controller.js';

class Application {
  static renderIntro() {
    IntroController.showIntro(Application.renderGreeting);
  }

  static renderGameCB(name) {
    const newGame = new GameController(new GameModel(name));
    newGame.renderGameState(Application.renderGreeting, Application.renderStatsCB);
  }

  static renderStatsCB(state) {
    StatsController.showStats(state);
  }

  static renderRules() {
    Application.renderHeader(false);
    RulesController.showRules(Application.renderGameCB);
  }

  static renderHeader(state) {
    HeaderController.showHeader(Application.renderGreeting, state);
  }

  static renderGreeting() {
    GreetingController.showGreeting(Application.renderRules);
  }
}

export default Application;
