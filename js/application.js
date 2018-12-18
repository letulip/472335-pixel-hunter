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
    const newGame = new GameController(new GameModel(name, IntroController.getQuestions()));
    newGame.renderGameState(Application.renderGreeting, Application.renderStatsCB);
  }

  static renderStatsCB(model) {
    StatsController.showStats(model);
  }

  static renderRules() {
    Application.renderHeader();
    RulesController.showRules(Application.renderGameCB);
  }

  static renderHeader(lives) {
    HeaderController.showHeader(Application.renderGreeting, lives);
  }

  static renderGreeting() {
    GreetingController.showGreeting(Application.renderRules);
  }
}

export default Application;
