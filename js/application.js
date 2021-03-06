import IntroController from './intro-controller.js';
import GreetingController from './greeting-controller.js';
import RulesController from './rules-controller.js';
import HeaderController from './header-controller.js';
import GameModel from './game-model.js';
import GameController from './game-controller.js';
import StatsController from './stats-controller.js';
import ErrorController from './error-controller.js';
import Loader from './loader.js';

let gameQuestions;

class Application {

  static renderIntro() {
    IntroController.showIntro(Application.renderGreeting);

    Loader.loadData()
    .then((data) => {
      gameQuestions = data;
    })
    .then(() => {
      Application.renderGreeting();
    })
    .catch((err) => {
      ErrorController.showError(err);
    });
  }

  static renderGameCB(name) {
    const game = new GameController(new GameModel(name, gameQuestions));
    game.renderGameState(Application.renderGreeting, Application.renderStatsCB);
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
