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
    this.model = gameModel;
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

  _startTimer(cb, headerElement, greetingCB, statsCB) {
    this._timer = setTimeout(() => {
      this.model.tick();
      cb(this.model.time, headerElement);
      if (this.model.isTimeOver()) {
        this._stopTimer();
        if (this.model.hasNextLevel() && !this.model.isDead()) {
          this.model.setNextLevel(this.model.time, false);
          this._renderGameState(greetingCB, statsCB);
        }
      } else {
        this._startTimer(cb, headerElement, greetingCB, statsCB);
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

  _renderGameState(greetingCB, statsCB) {

    if (this.model.hasNextLevel() && !this.model.isDead()) {
      const headerElement = HeaderController.showHeader(greetingCB, this.model.getLives());
      this._startTimer(this.updateTime, headerElement, greetingCB, statsCB);
      const checkIsCorrect = (isCorrect) => {
        this._stopTimer();
        this.model.setNextLevel(this.model.time, isCorrect);
        this._renderGameState(greetingCB, statsCB);
      };
      this._changeLevel(this.model.getQuestion(), this.model.getAnswers(), checkIsCorrect);
    } else {
      this._stopTimer();
      Application.renderHeader();
      Loader.saveResults(this.model, this.model._playerName)
        .then(() => {
          return Loader.loadResults(this.model._playerName);
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
