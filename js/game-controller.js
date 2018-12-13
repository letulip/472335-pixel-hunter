import ViewGame1 from './game-1-view.js';
import ViewGame2 from './game-2-view.js';
import ViewGame3 from './game-3-view.js';
import {gameRender, statsRender} from './render-module.js';
import Application from './application.js';
import {hasNextLevel, isDead, setNextLevel, decreaseLives, addAnswer, startTimer, stopTimer, resetTimer} from './state.js';

let timerValue = 30;

class GameController {
  constructor(gameModel) {
    this.model = gameModel;
  }

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

  static decreaseStateLives(state, answer) {
    if (!answer) {
      return decreaseLives(state);
    }
    return state;
  }

  static updateTimer(state) {
    const gameTimer = document.querySelector(`.game__timer`);
    if (gameTimer) {
      gameTimer.innerText = state.time;
      timerValue = state.time;
    }
    return state;
  }

  static renderGameState(state, greetingCB, statsCB) {
    Application.renderHeader(state);

    if (hasNextLevel(state.level, state.questions) && !isDead(state.lives)) {
      startTimer(resetTimer(stopTimer(state)), this.updateTimer);
      const checkIsCorrect = (isCorrect) => {
        this.renderGameState(setNextLevel(addAnswer(this.decreaseStateLives(state, isCorrect), {time: timerValue, isCorrect})), greetingCB, statsCB);
      };
      GameController.changeLevel(state.questions[state.level], state.answers, checkIsCorrect);
    } else {
      stopTimer(state);
      statsCB(state);
    }
  }
}

export default GameController;
