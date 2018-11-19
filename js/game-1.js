import pageRender from '../js/renderModule.js';
import renderGreeting from '../js/greeting.js';
import renderGame2 from '../js/game-2.js';

const game1 = document.querySelector(`#game-1`);

const renderGame1 = () => {
  pageRender(game1.innerHTML);

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderGreeting();
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
