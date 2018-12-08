import ViewHeader from './header.js';
import ViewGame1 from './game-1.js';
import ViewGame2 from './game-2.js';
import ViewGame3 from './game-3.js';
import {hasNextLevel, isDead, setNextLevel, decreaseLives, addAnswer} from './state.js';
import ViewStats from './stats.js';
import {gameRender, statsRender, contentRender, clearMainElement} from './renderModule.js';

const renderGameState = (state, greetingCB) => {
  const header = new ViewHeader(state, greetingCB);
  clearMainElement();
  contentRender(header.element);

  if (hasNextLevel(state.level, state.questions) && !isDead(state.lives)) {
    let tempState = state;
    const checkIsCorrect = (isCorrect) => {
      if (!isCorrect) {
        tempState = decreaseLives(state);
      }
      renderGameState(setNextLevel(addAnswer(tempState, {time: 15, isCorrect})), greetingCB);
    };

    const question = tempState.questions[tempState.level];
    switch (question.type) {
      case `single`:
        const level2 = new ViewGame2(question, checkIsCorrect);
        gameRender(level2.element, greetingCB);
        statsRender(tempState.answers);
        break;
      case `double`:
        const level1 = new ViewGame1(question, checkIsCorrect);
        gameRender(level1.element, greetingCB);
        statsRender(tempState.answers);
        break;
      default:
        const level3 = new ViewGame3(question, checkIsCorrect);
        gameRender(level3.element, greetingCB);
        statsRender(tempState.answers);
    }
  } else {
    const stats = new ViewStats(state);
    contentRender(stats.element);
  }

};

export default renderGameState;
