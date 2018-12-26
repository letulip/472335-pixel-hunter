import ViewGame1 from './game-1-view.js';
import ViewGame2 from './game-2-view.js';
import ViewGame3 from './game-3-view.js';
import {gameRender, statsRender} from './render-module.js';
import Application from './application.js';
import HeaderController from './header-controller.js';
import Loader from './loader.js';
import ErrorController from './error-controller.js';

const ONE_SECOND = 1000;
const ANIMATION = {
  TIME: 5,
  OPACITY: 0,
  VISIBILITY: 1,
  TIMEFRAME: 500,
};

class GameController {
  constructor(gameModel) {
    this._model = gameModel;
    this._timer = null;
  }

  _changeLevel(question, answers, cb) {
    let level;
    switch (question.type) {
      case `single`:
        level = new ViewGame2(question, cb);
        this._renderGame(level, answers);
        break;
      case `double`:
        level = new ViewGame1(question, cb);
        this._renderGame(level, answers);
        break;
      default:
        level = new ViewGame3(question, cb);
        this._renderGame(level, answers);
    }
  }

  _startTimer(cb, headerElement, confirmCB, statsCB) {
    this._timer = setTimeout(() => {
      this._model.tick();
      cb(this._model.time, headerElement);
      if (this._model.isTimeOver()) {
        this._stopTimer();
        if (this._model.hasNextLevel() && !this._model.isDead()) {
          this._model.setNextLevel(this._model.time, false);
          this._renderGameState(confirmCB, statsCB);
        }
      } else {
        this._startTimer(cb, headerElement, confirmCB, statsCB);
      }
    }, ONE_SECOND);
  }

  _stopTimer() {
    clearTimeout(this._timer);
  }

  _renderGame(level, answers) {
    gameRender(level.element);
    statsRender(answers);
  }

  updateTime(time, headerElement) {
    const gameTimer = headerElement.querySelector(`.game__timer`);
    if (gameTimer) {
      if (time <= ANIMATION.TIME) {
        gameTimer.animate([
          {
            opacity: ANIMATION.OPACITY
          },
          {
            opacity: ANIMATION.VISIBILITY
          }
        ], ANIMATION.TIMEFRAME);
      }
      gameTimer.innerText = time;
    }
  }

  _renderGameState(confirmCB, statsCB) {

    if (this._model.hasNextLevel() && !this._model.isDead()) {
      const headerElement = HeaderController.showHeader(confirmCB, this._model.getLives());
      this._startTimer(this.updateTime, headerElement, confirmCB, statsCB);
      const checkIsCorrect = (isCorrect) => {
        this._stopTimer();
        this._model.setNextLevel(this._model.time, isCorrect);
        this._renderGameState(confirmCB, statsCB);
      };
      this._changeLevel(this._model.getQuestion(), this._model.getAnswers(), checkIsCorrect);
    } else {
      this._stopTimer();
      Application.renderHeader();
      Loader.saveResults(this._model, this._model._playerName)
        .then(() => {
          return Loader.loadResults(this._model._playerName);
        })
        .then((data) => {
          statsCB(data);
        })
        .catch((err) => {
          ErrorController.showError(err);
        });
    }
  }
}

export default GameController;
