import ViewGame1 from './game-1-view.js';
import ViewGame2 from './game-2-view.js';
import ViewGame3 from './game-3-view.js';
import {gameRender, statsRender} from './render-module.js';

class GameController {
  static changeLevel(question, answers, cb) {
    let level;
    switch (question.type) {
      case `single`:
        level = new ViewGame2(question, cb);
        GameController.renderGame(level, answers);
        break;
      case `double`:
        level = new ViewGame1(question, cb);
        GameController.renderGame(level, answers);
        break;
      default:
        level = new ViewGame3(question, cb);
        GameController.renderGame(level, answers);
    }
  }

  static renderGame(level, answers) {
    gameRender(level.element);
    statsRender(answers);
  }
}

export default GameController;
