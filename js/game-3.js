import pageRender from '../js/renderModule.js';
import renderGreeting from '../js/greeting.js';
import renderStats from '../js/stats.js';

const game3 = document.querySelector(`#game-3`);

const renderGame3 = () => {
  pageRender(game3.innerHTML);

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
