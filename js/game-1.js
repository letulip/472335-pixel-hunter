import pageRender from "/js/renderModule.js";
import renderRules from "/js/rules.js";

const game1 = document.querySelector(`#game-1`);

const renderGame1 = () => {
  pageRender(game1.innerHTML);

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderRules();
  });

};

export default renderGame1;
