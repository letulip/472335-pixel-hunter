import ViewGame1 from './game-1-view.js';
import ViewGame2 from './game-2-view.js';
import ViewGame3 from './game-3-view.js';
import {gameRender, statsRender} from './render-module.js';
import Application from './application.js';
import {hasNextLevel, isDead, setNextLevel, decreaseLives, addAnswer, resetTimer} from './state.js';

let timerValue = 30;

let timer;
const ONE_SECOND = 1000;

const startTimer = (state, cb) => {
  timer = setTimeout(() => {
    startTimer(cb(tickTimer(state)), cb);
  }, ONE_SECOND);
};

const stopTimer = (state) => {
  clearTimeout(timer);
  return state;
};

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

  renderGame(level, answers) {
    gameRender(level.element);
    statsRender(answers);
  }

  decreaseStateLives(state, answer) {
    if (!answer) {
      return decreaseLives(state);
    }
    return state;
  }

  updateTimer(state) {
    const gameTimer = document.querySelector(`.game__timer`);
    if (gameTimer) {
      gameTimer.innerText = state.time;
      timerValue = state.time;
    }
    return state;
  }

  renderGameState(state, greetingCB, statsCB) {
    Application.renderHeader(state);

    if (hasNextLevel(state.level, state.questions) && !isDead(state.lives)) {
      startTimer(resetTimer(stopTimer(state)), this.updateTimer);
      const checkIsCorrect = (isCorrect) => {
        this.renderGameState(setNextLevel(addAnswer(this.decreaseStateLives(state, isCorrect), {time: timerValue, isCorrect})), greetingCB, statsCB);
      };
      this.changeLevel(state.questions[state.level], state.answers, checkIsCorrect);
    } else {
      stopTimer(state);
      statsCB(state);
    }
  }
}

export default GameController;
