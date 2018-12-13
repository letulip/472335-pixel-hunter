import Application from './application.js';
import GameController from './game-controller.js';
import {hasNextLevel, isDead, setNextLevel, decreaseLives, addAnswer, startTimer, stopTimer, resetTimer} from './state.js';

const decreaseStateLives = (state, answer) => {
  if (!answer) {
    return decreaseLives(state);
  }
  return state;
};

let timerValue;

const updateTimer = (state) => {
  const gameTimer = document.querySelector(`.game__timer`);
  if (gameTimer) {
    gameTimer.innerText = state.time;
    timerValue = state.time;
  }
  return state;
};

const changeLevel = (question, answers, cb) => {
  switch (question.type) {
    case `single`:
      GameController.renderGame2(question, answers, cb);
      break;
    case `double`:
      GameController.renderGame1(question, answers, cb);
      break;
    default:
      GameController.renderGame3(question, answers, cb);
  }
};

const renderGameState = (state, greetingCB, statsCB) => {
  Application.renderHeader(state);

  if (hasNextLevel(state.level, state.questions) && !isDead(state.lives)) {
    startTimer(resetTimer(stopTimer(state)), updateTimer);
    const checkIsCorrect = (isCorrect) => {
      renderGameState(setNextLevel(addAnswer(decreaseStateLives(state, isCorrect), {time: timerValue, isCorrect})), greetingCB, statsCB);
    };
    changeLevel(state.questions[state.level], state.answers, checkIsCorrect);

  } else {
    stopTimer(state);
    statsCB(state);
  }

};

export default renderGameState;
