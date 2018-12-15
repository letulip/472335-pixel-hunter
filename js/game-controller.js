import ViewGame1 from './game-1-view.js';
import ViewGame2 from './game-2-view.js';
import ViewGame3 from './game-3-view.js';
import {gameRender, statsRender} from './render-module.js';
import Application from './application.js';

const ONE_SECOND = 1000;

class GameController {
  constructor(gameModel) {
    this.model = gameModel;
    this.timer = null;
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

  startTimer(cb, greetingCB, statsCB) {
    this.timer = setTimeout(() => {
      this.model.tick();
      cb(this.model.time);
      if (this.model.isTimeOver()) {
        this.stopTimer();
        if (this.model.hasNextLevel() && !this.model.isDead()) {
          this.model.setNextLevel(this.model.time, false);
          this.renderGameState(greetingCB, statsCB);
        }
      } else {
        this.startTimer(cb, greetingCB, statsCB);
      }
    }, ONE_SECOND);
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

  renderGame(level, answers) {
    gameRender(level.element);
    statsRender(answers);
  }

  updateTime(time) {
    const gameTimer = document.querySelector(`.game__timer`);
    if (gameTimer) {
      gameTimer.innerText = time;
    }
  }

  renderGameState(greetingCB, statsCB) {
    this.stopTimer();
    this.model.resetTimer();

    if (this.model.hasNextLevel() && !this.model.isDead()) {
      Application.renderHeader(this.model.getLives());
      // создать Header
      // создать функцию обертку над updateTime
      // рендеришь хедер

      this.startTimer(this.updateTime, greetingCB, statsCB);
      const checkIsCorrect = (isCorrect) => {
        this.model.setNextLevel(this.model.time, isCorrect);
        this.renderGameState(greetingCB, statsCB);
      };
      this.changeLevel(this.model.getQuestion(), this.model.getAnswers(), checkIsCorrect);
    } else {
      Application.renderHeader();
      statsCB(this.model);
    }
  }
}

export default GameController;
