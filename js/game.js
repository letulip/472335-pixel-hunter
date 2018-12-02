// import {gameRender, statsRender} from './renderModule.js';
// import renderHeader from './header.js';
// import renderGreeting from './greeting.js';
import renderGame1 from './game-1.js';
import renderGame2 from './game-2.js';
import renderGame3 from './game-3.js';
import {hasNextLevel} from './state.js';
import renderStats from './stats.js';

const renderGame = (state) => {
  if (hasNextLevel(state.level, state.questions)) {
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
    renderStats(state);
  }

};

export default renderGame;
