import {gameRender, statsRender} from './renderModule.js';
import renderGreeting from './greeting.js';
import renderStats from './stats.js';

const game3 = `
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    <div class="game__option">
      <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option  game__option--selected">
      <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
    </div>
    <div class="game__option">
      <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
    </div>
  </form>
  <ul class="stats">
  </ul>`;

const renderGame3 = () => {
  gameRender(game3);
  statsRender();

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderGreeting();
  });

  const gameOptionsList = document.querySelectorAll(`.game__option`);
  gameOptionsList.forEach((option) => {
    option.addEventListener(`click`, () => {
      renderStats();
    });
  });
};

export default renderGame3;
