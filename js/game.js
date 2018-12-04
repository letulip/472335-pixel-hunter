import renderHeader from './header.js';
import renderGreeting from './greeting.js';
import renderGame1 from './game-1.js';
import renderGame2 from './game-2.js';
import renderGame3 from './game-3.js';
import {hasNextLevel, resetTimer, isDead, setNextLevel, decreaseLives, addAnswer} from './state.js';
import renderTotalStats from './stats.js';
import {statsRender} from './renderModule.js';

const renderGameOptions = (question, type) => {
  let gameOptions = ``;

  question.options.forEach((option, index) => {
    switch (type) {
      case `single`:
        gameOptions += `<div class="game__option">
          <img src="${option.src}" alt="Option ${index}" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question${index}" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question${index}" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>`;
        break;
      case `double`:
        gameOptions += `<div class="game__option">
          <img src="${option.src}" alt="Option ${index}" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name="question${index}" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name="question${index}" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>`;
        break;
      default:
        gameOptions += `<div class="game__option">
          <img src="${option.src}" alt="Option ${index}" width="304" height="455">
        </div>`;
    }
  });

  return gameOptions;
};

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
