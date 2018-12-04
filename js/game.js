import renderHeader from './header.js';
import renderGreeting from './greeting.js';
import renderGame1 from './game-1.js';
import renderGame2 from './game-2.js';
import renderGame3 from './game-3.js';
import {hasNextLevel, resetTimer, isDead, setNextLevel, decreaseLives, addAnswer} from './state.js';
import renderTotalStats from './stats.js';
import {statsRender} from './renderModule.js';

const renderGame = (state) => {
  if (hasNextLevel(state.level, state.questions) && !isDead(state.lives)) {
    renderHeader(resetTimer(state));
    const checkAnswer = (answer) => {
      if (!answer.isCorrect) {
        renderGame(setNextLevel(decreaseLives(addAnswer(state, answer))));
      } else {
        renderGame(setNextLevel(addAnswer(state, answer)));
      }
    };
    const backButton = document.querySelector(`.back`);
    backButton.addEventListener(`click`, () => {
      renderGreeting();
    });
    const question = state.questions[state.level];
    switch (question.type) {
      case `single`:
        renderGame2(question.options, checkAnswer);
        statsRender(state.answers);
        break;
      case `double`:
        renderGame1(question.options, checkAnswer);
        statsRender(state.answers);
        break;
      default:
        renderGame3(question.options, checkAnswer);
        statsRender(state.answers);
    }
  } else {
    renderTotalStats(state);
  }

};

export default renderGame;
