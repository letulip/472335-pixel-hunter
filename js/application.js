import IntroController from './intro-controller.js';
import GreetingController from './greeting-controller.js';
import RulesController from './rules-controller.js';
import HeaderController from './header-controller.js';
import GameModel from './game-model.js';
import GameController from './game-controller.js';
import StatsController from './stats-controller.js';
import SplashController from './splash-controller.js';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

class Application {
  static start() {
    SplashController.showSplash(checkStatus);
  }

  static renderIntro() {
    IntroController.showIntro(Application.renderGreeting);
  }

  static renderGameCB(name) {
    const newGame = new GameController(new GameModel(name));
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
