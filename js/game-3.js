import {gameRender, statsRender} from './renderModule.js';
import renderHeader from './header.js';
import renderGreeting from './greeting.js';
import renderStats from './stats.js';
import {INITIAL_STATE_WITH_QUESTIONS, addAnswer, resetTimer} from './state.js';

const game3 = `
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    <div class="game__option">
      <img src="${INITIAL_STATE_WITH_QUESTIONS.questions[2].options[0].src}" alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option  game__option--selected">
      <img src="${INITIAL_STATE_WITH_QUESTIONS.questions[2].options[1].src}" alt="Option 2" width="304" height="455">
    </div>
    <div class="game__option">
      <img src="${INITIAL_STATE_WITH_QUESTIONS.questions[2].options[2].src}" alt="Option 3" width="304" height="455">
    </div>
  </form>
  <ul class="stats">
  </ul>`;

const renderGame3 = (stateFromGame2) => {
  renderHeader(stateFromGame2);
  resetTimer(stateFromGame2);
  gameRender(game3);
  const gameSection = document.querySelector(`.game`);
  statsRender(gameSection, stateFromGame2.answers);

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderGreeting();
  });

  const gameOptionsList = document.querySelectorAll(`.game__option`);
  gameOptionsList.forEach((option) => {
    option.addEventListener(`click`, () => {
      const timer = document.querySelector(`.game__timer`);
      const answer = {
        time: timer.textContent,
        isCorrect: true
      };
      const tempState = addAnswer(stateFromGame2, answer);
      statsRender(gameSection, tempState.answers);
      renderStats(tempState);
    });
  });
};

export default renderGame3;
