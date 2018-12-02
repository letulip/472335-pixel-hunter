import {gameRender, statsRender} from './renderModule.js';
import renderHeader from './header.js';
import renderGreeting from './greeting.js';
import {addAnswer, resetTimer, setNextLevel} from './state.js';

const renderGame3 = (state, cb) => {

  const game3 = `
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${state.questions[state.level].options[0].src}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${state.questions[state.level].options[1].src}" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${state.questions[state.level].options[2].src}" alt="Option 3" width="304" height="455">
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
  gameOptionsList.forEach((option, number) => {
    option.addEventListener(`click`, () => {
      const timer = document.querySelector(`.game__timer`);
      let answer = {};
      if (number === 1) {
        answer = {
          time: timer.textContent,
          isCorrect: true
        };
      } else {
        answer = {
          time: timer.textContent,
          isCorrect: false
        };
      }
      cb(setNextLevel(addAnswer(state, answer)));
    });
  });
};

export default renderGame3;
