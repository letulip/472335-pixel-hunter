import {gameRender, statsRender} from './renderModule.js';
import renderHeader from './header.js';
import renderGreeting from './greeting.js';
import renderGame1 from './game-1.js';
import renderGame2 from './game-2.js';
import renderGame3 from './game-3.js';
import {INITIAL_STATE_WITH_QUESTIONS} from './state.js';

const renderSingle = (question) => {
  renderGame2(question);
};

const renderDouble = (question) => {
  renderGame1(question);
};

const renderTriple = (question) => {
  renderGame3(question);
};

const renderGame = () => {
  renderHeader(INITIAL_STATE_WITH_QUESTIONS);
  for (let i = 0; i < INITIAL_STATE_WITH_QUESTIONS.questions.length; i++) {
    if (INITIAL_STATE_WITH_QUESTIONS.questions[i].type === `single`) {
      renderSingle(INITIAL_STATE_WITH_QUESTIONS.questions[i]);
    }
    if (INITIAL_STATE_WITH_QUESTIONS.questions[i].type === `double`) {
      renderDouble(INITIAL_STATE_WITH_QUESTIONS.questions[i]);
    }
    if (INITIAL_STATE_WITH_QUESTIONS.questions[i].type === `triple`) {
      renderTriple(INITIAL_STATE_WITH_QUESTIONS.questions[i]);
    }
  }
};

export default renderGame;
