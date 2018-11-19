import pageRender from '../js/renderModule.js';
import renderGreeting from '../js/greeting.js';

const stats = document.querySelector(`#stats`);

const renderStats = () => {
  pageRender(stats.innerHTML);

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

export default renderStats;
