import pageRender from './renderModule.js';
import renderGreeting from './greeting.js';
import renderGame1 from './game-1.js';

const rules = document.querySelector(`#rules`);

const renderRules = () => {
  pageRender(rules.innerHTML);

  const backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderGreeting();
  });

  const rulesInput = document.querySelector(`.rules__input`);
  rulesInput.addEventListener(`change`, () => {
    const goButton = document.querySelector(`.continue`);

    if (rulesInput.value) {
      goButton.removeAttribute(`disabled`);
      goButton.addEventListener(`click`, () => {
        renderGame1();
      });
    } else {
      goButton.setAttribute(`disabled`, `true`);
    }
  });
};

export default renderRules;
