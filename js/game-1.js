import pageRender from '../js/renderModule.js';
import renderRules from '../js/rules.js';
import renderGame2 from '../js/game-2.js';

const game1 = document.querySelector(`#game-1`);

const renderGame1 = () => {
  pageRender(game1.innerHTML);

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderRules();
  });

  const inputsList = document.querySelectorAll(`input`);
  inputsList.forEach((input) => {
    input.addEventListener(`change`, () => {
      if ((inputsList[0].checked || inputsList[1].checked) && (inputsList[2].checked || inputsList[3].checked)) {
        renderGame2();
      }
    });
  });
};

export default renderGame1;
