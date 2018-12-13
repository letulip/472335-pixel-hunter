import Application from './application.js';
import GameController from './game-controller.js';
import {hasNextLevel, isDead, setNextLevel, decreaseLives, addAnswer, startTimer, stopTimer, resetTimer} from './state.js';

let timerValue = 30;

class GameModel {
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
      startTimer(resetTimer(stopTimer(state)), GameModel.updateTimer);
      const checkIsCorrect = (isCorrect) => {
        GameModel.renderGameState(setNextLevel(addAnswer(GameModel.decreaseStateLives(state, isCorrect), {time: timerValue, isCorrect})), greetingCB, statsCB);
      };
      GameController.changeLevel(state.questions[state.level], state.answers, checkIsCorrect);
    } else {
      stopTimer(state);
      statsCB(state);
    }
  }
}

export default GameModel;
