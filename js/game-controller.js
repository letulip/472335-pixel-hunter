import ViewGame1 from './game-1-view.js';
import ViewGame2 from './game-2-view.js';
import ViewGame3 from './game-3-view.js';
import {gameRender, statsRender} from './render-module.js';
import Application from './application.js';
import {resetTimer} from './state.js';

let timerValue = 30;

let timer;
const ONE_SECOND = 1000;

class GameController {
  constructor(gameModel) {
    this.model = gameModel;
  }

  changeLevel(question, answers, cb) {
    let level;
    switch (question.type) {
      case `single`:
        level = new ViewGame2(question, cb);
        this.renderGame(level, answers);
        break;
      case `double`:
        level = new ViewGame1(question, cb);
        this.renderGame(level, answers);
        break;
      default:
        level = new ViewGame3(question, cb);
        this.renderGame(level, answers);
    }
  }

  startTimer(cb) {
    timer = setTimeout(() => {
      cb(this.model.tick());
      this.startTimer(cb);
    }, ONE_SECOND);
  }

  stopTimer() {
    clearTimeout(timer);
  }

  renderGame(level, answers) {
    gameRender(level.element);
    statsRender(answers);
  }

  updateTimer(state) {
    const gameTimer = document.querySelector(`.game__timer`);
    if (gameTimer) {
      gameTimer.innerText = state.time;
      timerValue = state.time;
    }
    return state;
  }

  renderGameState(greetingCB, statsCB) {
    Application.renderHeader(this.model.state);
    this.stopTimer();
    this.model.resetTimer();

    if (this.model.hasNextLevel() && !this.model.isDead()) {

      this.startTimer(this.updateTimer);
      const checkIsCorrect = (isCorrect) => {
        this.model.setNextLevel(timerValue, isCorrect);
        this.renderGameState(greetingCB, statsCB);
      };
      this.changeLevel(this.model.state.questions[this.model.state.level], this.model.state.answers, checkIsCorrect);
    } else {
      this.stopTimer();
      statsCB(this.model.state);
    }
  }
}

export default GameController;
