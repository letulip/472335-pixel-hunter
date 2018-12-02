import renderHeader from './header.js';
import renderGreeting from './greeting.js';
import renderGame1 from './game-1.js';
import renderGame2 from './game-2.js';
import renderGame3 from './game-3.js';
import {hasNextLevel, resetTimer, isDead} from './state.js';
import renderTotalStats from './stats.js';

const renderGame = (state) => {
  if (hasNextLevel(state.level, state.questions) && !isDead(state.lives)) {
    renderHeader(state);
    resetTimer(state);
    const backButton = document.querySelector(`.back`);
    backButton.addEventListener(`click`, () => {
      renderGreeting();
    });
    switch (state.questions[state.level].type) {
      case `single`:
        renderGame2(state, renderGame);
        break;
      case `double`:
        renderGame1(state, renderGame);
        break;
      default:
        renderGame3(state, renderGame);
    }
  } else {
    renderTotalStats(state);
  }

};

export default renderGame;
