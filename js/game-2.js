import pageRender from '../js/renderModule.js';
import renderRules from '../js/rules.js';
import renderGame3 from '../js/game-3.js';

const game2 = document.querySelector(`#game-2`);

const renderGame2 = () => {
  pageRender(game2.innerHTML);

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderRules();
  });

  const inputsList = document.querySelectorAll(`input`);
  inputsList.forEach((input) => {
    input.addEventListener(`change`, () => {
      renderGame3();
    });
  });
};

export default renderGame2;
