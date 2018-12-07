import ViewHeader from './header.js';
import ViewGame1 from './game-1.js';
import ViewGame2 from './game-2.js';
import ViewGame3 from './game-3.js';
import {hasNextLevel, resetTimer, isDead, setNextLevel, decreaseLives, addAnswer} from './state.js';
import ViewStats from './stats.js';
import {gameRender, statsRender, contentRender, clearMainElement} from './renderModule.js';

const renderGame = (state, headerCB) => {
  const header = new ViewHeader(resetTimer(state), false, headerCB);
  clearMainElement();
  contentRender(header.element);

  if (hasNextLevel(state.level, state.questions) && !isDead(state.lives)) {
    // clearMainElement();
    // contentRender(header.element);
    const checkIsCorrect = (isCorrect) => {
      if (!isCorrect) {
        renderGame(setNextLevel(decreaseLives(addAnswer(state, {time: 15, isCorrect}))), headerCB);
      } else {
        renderGame(setNextLevel(addAnswer(state, {time: 15, isCorrect})), headerCB);
      }
    };

    const question = state.questions[state.level];
    switch (question.type) {
      case `single`:
        const level2 = new ViewGame2(question, checkIsCorrect);
        gameRender(level2.element, headerCB);
        statsRender(state.answers);
        break;
      case `double`:
        const level1 = new ViewGame1(question, checkIsCorrect);
        gameRender(level1.element, headerCB);
        statsRender(state.answers);
        break;
      default:
        const level3 = new ViewGame3(question, checkIsCorrect);
        gameRender(level3.element, headerCB);
        statsRender(state.answers);
    }
  } else {
    const stats = new ViewStats(state);
    // clearMainElement();
    contentRender(stats.element);
  }

};

export default renderGame;
