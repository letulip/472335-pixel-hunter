import {gameRender, statsRender} from './renderModule.js';
import renderHeader from './header.js';
import renderGreeting from './greeting.js';
import renderStats from './stats.js';
import {addAnswer, resetTimer, setNextLevel, hasNextLevel} from './state.js';

const renderGame3 = (state, cb) => {

  const game3 = `
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${state.questions[2].options[0].src}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${state.questions[2].options[1].src}" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${state.questions[2].options[2].src}" alt="Option 3" width="304" height="455">
      </div>
    </form>
    <ul class="stats">
    </ul>`;

  renderHeader(state);
  resetTimer(state);
  gameRender(game3);
  const gameSection = document.querySelector(`.game`);
  statsRender(gameSection, state.answers);

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
      const tempState = addAnswer(state, answer);
      statsRender(gameSection, tempState.answers);
      if (hasNextLevel(tempState.level, tempState.questions)) {
        cb(setNextLevel(tempState));
      } else {
        renderStats(tempState);
      }
    });
  });
};

export default renderGame3;
