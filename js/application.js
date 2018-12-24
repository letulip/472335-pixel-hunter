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
    IntroController.showIntro(Application._renderGreeting);

    Loader.loadData()
    .then((data) => {
      gameQuestions = data;
    })
    .then(() => {
      Application._renderGreeting();
    })
    .catch((err) => {
      ErrorController.showError(err);
    });
  }

  static _renderGameCB(name) {
    const game = new GameController(new GameModel(name, gameQuestions));
    game._renderGameState(Application._renderGreeting, Application._renderStatsCB);
  }

  static _renderStatsCB(model) {
    StatsController.showStats(model);
  }

  static _renderRules() {
    Application.renderHeader();
    RulesController.showRules(Application._renderGameCB);
  }

  static renderHeader(lives) {
    HeaderController.showHeader(Application._renderGreeting, lives);
  }

  static _renderGreeting() {
    GreetingController.showGreeting(Application._renderRules);
  }
}

export default Application;
