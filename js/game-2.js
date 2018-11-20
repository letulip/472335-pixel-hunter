import pageRender from './renderModule.js';
import renderGreeting from './greeting.js';
import renderGame3 from './game-3.js';

const game2 = document.querySelector(`#game-2`);

const renderGame2 = () => {
  pageRender(game2.innerHTML);

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderGreeting();
  });

  const inputsList = document.querySelectorAll(`input`);
  inputsList.forEach((input) => {
    input.addEventListener(`change`, () => {
      renderGame3();
    });
  });
};

export default renderGame2;
