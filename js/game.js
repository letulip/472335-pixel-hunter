import ViewHeader from './header.js';
import ViewGame1 from './game-1.js';
import ViewGame2 from './game-2.js';
import ViewGame3 from './game-3.js';
import {hasNextLevel, isDead, setNextLevel, decreaseLives, addAnswer} from './state.js';
import {gameRender, statsRender, contentRender, clearMainElement} from './render-module.js';

const decreaseStateLives = (state, answer) => {
  if (!answer) {
    return decreaseLives(state);
  }
  return state;
};

const renderGameState = (state, greetingCB, statsCB) => {
  const header = new ViewHeader(state, greetingCB);
  clearMainElement();
  contentRender(header.element);

  if (hasNextLevel(state.level, state.questions) && !isDead(state.lives)) {
    const checkIsCorrect = (isCorrect) => {
      renderGameState(setNextLevel(addAnswer(decreaseStateLives(state, isCorrect), {time: 15, isCorrect})), greetingCB, statsCB);
    };

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
    statsCB(state);
  }

};

export default renderGameState;
