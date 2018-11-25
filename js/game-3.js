import {gameRender, statsRender} from './renderModule.js';
import renderHeader from './header.js';
import renderGreeting from './greeting.js';
import renderStats from './stats.js';
import images from './sampleImages.js';

const game3 = `
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    <div class="game__option">
      <img src="${images.paintings[2]}" alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option  game__option--selected">
      <img src="${images.photos[1]}" alt="Option 2" width="304" height="455">
    </div>
    <div class="game__option">
      <img src="${images.photos[2]}" alt="Option 3" width="304" height="455">
    </div>
  </form>
  <ul class="stats">
  </ul>`;

const renderGame3 = (stateFromGame2) => {
  renderHeader(stateFromGame2);
  gameRender(game3);
  statsRender();

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderGreeting();
  });

  const gameOptionsList = document.querySelectorAll(`.game__option`);
  gameOptionsList.forEach((option) => {
    option.addEventListener(`click`, () => {
      renderStats(stateFromGame2);
    });
  });
};

export default renderGame3;
