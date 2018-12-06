import renderHeader from './header.js';
import renderGreeting from './greeting.js';
import ViewGame1 from './game-1.js';
import ViewGame2 from './game-2.js';
import ViewGame3 from './game-3.js';
import {hasNextLevel, resetTimer, isDead, setNextLevel, decreaseLives, addAnswer} from './state.js';
import renderTotalStats from './stats.js';
import {gameRender, statsRender} from './renderModule.js';

const renderGame = (state) => {
  if (hasNextLevel(state.level, state.questions) && !isDead(state.lives)) {
    renderHeader(resetTimer(state));
    const checkIsCorrect = (isCorrect) => {
      if (!isCorrect) {
        renderGame(setNextLevel(decreaseLives(addAnswer(state, {time: 15, isCorrect}))));
      } else {
        renderGame(setNextLevel(addAnswer(state, {time: 15, isCorrect})));
      }
    };
    const backButton = document.querySelector(`.back`);
    backButton.addEventListener(`click`, () => {
      renderGreeting();
    });
    const question = state.questions[state.level];
    switch (question.type) {
      case `single`:
        const level2 = new ViewGame2(question, checkIsCorrect);
        gameRender(level2.element);
        statsRender(state.answers);
        break;
      case `double`:
        const level1 = new ViewGame1(question, checkIsCorrect);
        gameRender(level1.element);
        statsRender(state.answers);
        break;
      default:
        const level3 = new ViewGame3(question, checkIsCorrect);
        gameRender(level3.element);
        statsRender(state.answers);
    }
  } else {
    renderTotalStats(state);
  }

};

export default renderGame;
