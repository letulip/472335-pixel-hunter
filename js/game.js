import Application from './application.js';
import ViewGame1 from './game-1.js';
import ViewGame2 from './game-2.js';
import ViewGame3 from './game-3.js';
import {hasNextLevel, isDead, setNextLevel, decreaseLives, addAnswer, startTimer, stopTimer, resetTimer} from './state.js';
import {gameRender, statsRender} from './render-module.js';

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
      const level2 = new ViewGame2(question, cb);
      gameRender(level2.element);
      statsRender(answers);
      break;
    case `double`:
      const level1 = new ViewGame1(question, cb);
      gameRender(level1.element);
      statsRender(answers);
      break;
    default:
      const level3 = new ViewGame3(question, cb);
      gameRender(level3.element);
      statsRender(answers);
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
