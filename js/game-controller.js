import ViewGame1 from './game-1-view.js';
import ViewGame2 from './game-2-view.js';
import ViewGame3 from './game-3-view.js';
import {gameRender, statsRender} from './render-module.js';

class GameController {
  static renderGame1(question, answers, cb) {
    const level = new ViewGame1(question, cb);
    gameRender(level.element);
    statsRender(answers);
  }

  static renderGame2(question, answers, cb) {
    const level = new ViewGame2(question, cb);
    gameRender(level.element);
    statsRender(answers);
  }

  static renderGame3(question, answers, cb) {
    const level = new ViewGame3(question, cb);
    gameRender(level.element);
    statsRender(answers);
  }
}

export default GameController;
